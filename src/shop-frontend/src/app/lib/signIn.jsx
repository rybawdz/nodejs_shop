import AuthError from "../lib/authError"
async function signIn(formData){
        const dataToSend = { email : formData.get("email"), password: formData.get("password") };

        const response = await fetch("http://localhost:4040/api/v1/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        // Parse the JSON data from the response
        
        if (response.status == 400) {
            const data = await response.json();
            throw new AuthError(data.message);
        }
        if (response.status == 500) {
            throw new Error('Server-side error');
        }
        return response;

;
}
export default signIn;
