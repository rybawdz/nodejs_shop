async function processForm(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const action = formData.get('action');

    const fileInput = event.currentTarget.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (action == 'add') {
      const formDataForServer = new FormData();
      formDataForServer.append('name', formData.get('name'));
      formDataForServer.append('description', formData.get('description'));
      formDataForServer.append('price', formData.get('price'));
      formDataForServer.append('image', file);

      const response = await fetch('http://localhost:4040/api/v1/product', {
        method: 'POST',
        body: formDataForServer,
      });
      if (response.ok) {
        console.log('Product added successfully');
      } else {
        console.error('Error adding product:', response.status);
      }
    }
    else if (action == 'delete') {
        const dataToSend = { name: formData.get('name') };
        const response = await fetch("http://localhost:4040/api/v1/product/delete", {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
          credentials: 'include'
        });

        if (response.ok) {
          console.log('Product added successfully');
        } else {
          console.error('Error adding product:', response.status);
        }

    }
    else {
      const formDataForServer = new FormData();
      formDataForServer.append('name', formData.get('name'));
      formDataForServer.append('description', formData.get('description'));
      formDataForServer.append('price', formData.get('price'));
      formDataForServer.append('image', file);

      const response = await fetch('http://localhost:4040/api/v1/product/update', {
        method: 'PUT',
        body: formDataForServer,
      });
      if (response.ok) {
        console.log('Product added successfully');
      } else {
        console.error('Error adding product:', response.status);
      }
    }
  };

  export default processForm;