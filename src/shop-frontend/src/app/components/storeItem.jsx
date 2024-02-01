function StoreItem({ photoPath, itemName, itemPrice, itemDescription }) {
    return (
        <div className="storeItemBox">
            <div className="itemPhoto">
                {photoPath && (
                    <img src={'localhost:4040' + photoPath} alt="item photo"/>
                )}
            </div>
            <div className="itemNameBox">
                {itemName && (
                    <p>{itemName}</p>
                )}
            </div>
            <div className="itemPriceBox">
                {itemPrice && (
                    <p>{itemPrice} PLN</p>
                )}
            </div>
            <div className="itemDescriptionBox">
                {itemDescription && (
                    <p>{itemDescription}</p>
                )}
            </div>
            <div className="buyBasketBox">
                <button>
                    Buy
                </button>
                <button>
                    🛒
                </button>
            </div>
        </div>
    )
}

export default StoreItem;