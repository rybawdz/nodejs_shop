import BasketItem from "./basketItem"

function Basket(items) {
    if(items){
        var price = 0;
        var content = (
            <form method="POST" className="basketForm">
                {items.map((item) => {
                    price = price + parseInt(item.quantity) * parseInt(item.product.price);
                    return (
                        <BasketItem
                            key={item.product.name}
                            name={item.product.name}
                            price={item.product.price}
                            quantity={item.quantity}
                        />
                    );
                })}
                <p>Total Price: {price}</p>
                <p>Address:</p>
                <input type="text" className="address" /><br />
                <p>Total: {price}</p>
                <input type="submit" value="Buy" />
            </form>
        );
    }
    else {
        content = <p>No items in basket.</p>
    }
    return (
        <div className="basketBox">
            {content}
        </div>
    )
}

export default Basket;