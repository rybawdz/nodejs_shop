import ValidationError from "./validationError";
import Error from "next/error";

function removeFromBasket(id) {
    return async (e) => {
    console.log("chuj");
    e.preventDefault();
    const url = 'http://localhost:4040/api/v1/user/basketremove';
    const dataToSend = {
        id: id,
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend),
    });

    if(response.ok) {
        location.reload();
    }

    if (response.status == 400) {
        throw new ValidationError(data.message);
    }
    if (response.status == 500) {
        throw new Error('Server-side error');
    }
}}

export default removeFromBasket;