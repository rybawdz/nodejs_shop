async function signIn(formData){
    try {
        pwd = formData.get("password");
        if (pwd != formData.get("confirmpwd")){
            throw new AuthError('PasswordMatch');
        }
        const url = 'http://localhost:4040/api/v1/users/register';
        const dataToSend = { email : formData.get("email"), password: pwd };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log('Response from server:', data);
    } catch (error) {
        console.error('Error sending POST request:', error.message);
    }
}
