import AuthError from "../lib/authError"
async function signUp(formData){
        const pwd = formData.get("password");
        if (pwd != formData.get("confirmpwd")){
            throw new AuthError("Passwords don't match");
        }
        const url = 'http://localhost:4040/api/v1/user';
        const dataToSend = { email : formData.get("email"), password: pwd };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        // Parse the JSON data from the response
        const data = await response.json();
        if (response.status == 400) {
            throw new AuthError("aa" + data.message);
        }
        if (response.status == 500) {
            throw new Error('Server-side error');
        }
        console.log('Response from server:', data);

;
}
export default signUp;
