import BasketItem from "./basketItem"

function Basket({items, submit}) {
    if(items){
        var price = 0;
        var content = (
            <form method="POST" className="basketForm" onSubmit={submit}>
                {items.map((item, index) => {
                    price = price + parseInt(item.quantity) * parseInt(item.product.price);
                    return (
                        <BasketItem
                            key={item.product.name}
                            name={item.product.name}
                            price={item.product.price}
                            id={"input" + index}
                        />
                    );
                })}
                <p>Address:</p>
                <input type="text" name="address" className="address" /><br />
                <p>Total price: {price}</p>
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