function StoreItem({ photoPath, itemName, itemPrice }) {
    return (
        <div className="storeItemBox">
            <div className="itemPhoto">
                {photoPath && (
                    <img src={photoPath} alt="item photo"/>
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