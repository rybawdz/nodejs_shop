import ItemSummary from "./itemSummary";

function BuyItemForm({submit, photoPath, itemName, itemPrice, itemDescription}) {
    return (
        <form method="post" onSubmit={submit}>
          <ItemSummary photoPath={photoPath} 
          itemName={itemName} itemPrice={itemPrice}
          itemDescription={itemDescription} />
        <p>Quantity</p>
        <input type="number" name="quantity" className="quantity"/>
        <p>Address</p>
        <input type="text" name="address" className="address"/>
        <input type="submit" value="Place Order"/>
      </form>
    )
}

export default BuyItemForm;