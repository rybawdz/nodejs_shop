function BasketItem({key, name, price, quantity}) {
    return (
        <div key={key}>
            <p>Item Name: {name}</p>
            <p>Item price: {price}</p>
            <p>Quantity: {quantity}</p>
        </div>
    )
}

export default BasketItem;