function ItemSummary({ photoPath, itemName, itemPrice, itemDescription }) {
    return (
        <div className="storeItemBox">
            <div className="itemPhoto">
                {photoPath && (
                    <img src={'http://localhost:4040/' + photoPath} alt="item photo"/>
                )}
            </div>
            <div className="itemNameBox">
                {itemName && (
                    <p>{itemName}</p>
                )}
            </div>
            <div className="itemDescriptionBox">
                {itemDescription && (
                    <p>{itemDescription}</p>
                )}
            </div>
            <div className="itemPriceBox">
                {itemPrice && (
                    <p>{itemPrice} PLN</p>
                )}
            </div>
        </div>
    )
}

export default ItemSummary;