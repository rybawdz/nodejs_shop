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
            // (quantity is read from item json - should be changed
            // to form input in the future)
            var items = item.map( (i) => ({
                itemId: i.product._id,
                itemName: i.product.name,
                quantity: i.quantity,
            }))
        }
        else {
            // assuming the order is requested from /buy
            // (quantity is read from form)
            const qunatity = formData.get("quantity");
            if(parseInt(qunatity).toString() != qunatity && 
            parseInt(qunatity) > 0){
                throw new ValidationError("Invalid quantity value");
            }

            var items = [
                            {
                                itemId: item._id,
                                itemName: item.name,
                                quantity: qunatity,
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
