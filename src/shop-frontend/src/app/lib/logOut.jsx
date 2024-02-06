import AuthError from "../lib/authError"
async function logout(){

        const response = await fetch("http://localhost:4040/api/v1/user/logout", {
            method: 'GET',
            credentials: 'include'
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
export default logout;