"use client"
import { useForm, useEffect } from 'react';
import ProductPanel from '../components/productPanel'
export default function Page() {

  async function processForm(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const action = formData.get('action');

    const fileInput = event.currentTarget.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const formDataForServer = new FormData();
    formDataForServer.append('name', formData.get('name'));
    formDataForServer.append('description', formData.get('description'));
    formDataForServer.append('price', formData.get('price'));
    formDataForServer.append('image', file);

    if(action == 'add'){

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
  };

  return (<ProductPanel submit={processForm}/>);
}
