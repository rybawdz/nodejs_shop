function BasketItem({key, name, price, quantity}) {
    return (
        <div key={key} className="basketItem">
            <p><label className="metaText">Item: </label> {name}</p>
            <p><label className="metaText">Price: </label>{price}</p>
            <p><label className="metaText">Quantity: </label>{quantity}</p>
        </div>
    )
}

export default BasketItem;