import ValidationError from "./validationError";
async function addOrder(item, formData){

        if(!item || item == undefined){
            throw new ValidationError("Invalid item");
        }

        const qunatity = formData.get("quantity");
        console.log("quantity is: " + qunatity);
        if(parseInt(qunatity).toString() != qunatity && 
           parseInt(qunatity) > 0){
            throw new ValidationError("Invalid quantity value");
        }

        const address = formData.get("address");
        console.log("adres is: " + address);
        if(!address){
            throw new ValidationError("Address is required");
        }

        const url = 'http://lcoalhost:4040/api/v1/user/buy';
        const dataToSend = {
            items: [
                {
                    itemId: item._id,
                    itemName: item.name,
                    quantity: formData.get("quantity"),
                }
            ],
            address: formData.get("address")
        }

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
            throw new ValidationError(data.message);
        }
        if (response.status == 500) {
            throw new Error('Server-side error');
        }
        console.log('Response from server:', data);
        return response;

;
}
export default addOrder;
