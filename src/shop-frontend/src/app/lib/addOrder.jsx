import ValidationError from "./validationError";
async function addOrder(item, formData){

        if(!item || item == undefined){
            throw new ValidationError("Invalid item");
        }

        const address = formData.get("address");
        if(!address){
            throw new ValidationError("Address is required");
        }
        
        if(Array.isArray(item)) {
            // assuming the order is requested from basket
            var items = item.map( (i,index) => ({
                itemId: i.product._id,
                itemName: i.product.name,
                quantity: formData.get("input" + index),
            }))
        }
        else {
            // assuming the order is requested from /buy
            // (quantity is read from form)
            const quantity = formData.get("quantity");
            if(parseInt(quantity).toString() != quantity && 
            parseInt(quantity) > 0){
                throw new ValidationError("Invalid quantity value");
            }

            var items = [
                            {
                                itemId: item._id,
                                itemName: item.name,
                                quantity: quantity,
                            }
                     ]
        }


        const url = 'http://localhost:4040/api/v1/buy';
        
        const dataToSend = {
            items: items,
            address: formData.get("address")
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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
