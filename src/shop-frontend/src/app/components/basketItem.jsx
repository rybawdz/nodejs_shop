import removeFromBasket from '../lib/removeFromBasket'

function BasketItem({name, price, id}) {
    return (
        <div key={name} className="basketItem">
            <p><label className="metaText">Item: </label> {name}</p>
            <p><label className="metaText">Price: </label>{price}</p>
            <p><label className="metaText">Quantity: </label>
                <input type="number" name={id} style={{width: "50px"}}/></p>
            <p><label className="metaText">Remove</label>
                <button className="removeButton" onClick={removeFromBasket(id)}>X</button></p>
        </div>
    )
}

export default BasketItem;