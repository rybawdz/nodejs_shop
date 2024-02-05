function UserOrders({orders}) {

    return (
        <div>
            {orders.map((order) => (
                <div key={order._id} className='orderTile'>
                <div className='orderTileTitle'>
                <p><label className='metaText'>Date: </label>{order.date}</p>
                <p><label className='metaText'>Address: </label>{order.address}</p>
                </div>
                <div className='orderTileProducts'>
                {order.items.map((item) => (
                    <div key={item._id}>
                    <p><label className='metaText'>Product: </label>{item.product.name}</p>
                    <p><label className='metaText'>Quantity: </label>{item.quantity}</p>
                    <p><label className='metaText'>Price: </label>{item.product.price}</p>
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>
    )
}

export default UserOrders;