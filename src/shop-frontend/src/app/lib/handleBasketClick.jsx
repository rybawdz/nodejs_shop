import ValidationError from "./validationError";
function handleBasketClick(name) {
    return async (e) => {
    e.preventDefault();
    const url = 'http://localhost:4040/api/v1/product/basket';
    const dataToSend = {
        itemName: name,
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend),
    });

    if (response.status == 400) {
        throw new ValidationError(data.message);
    }
    if (response.status == 500) {
        throw new Error('Server-side error');
    }
}}

export default handleBasketClick;