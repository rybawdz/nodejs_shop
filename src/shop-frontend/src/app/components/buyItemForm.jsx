import ItemSummary from "./itemSummary";

function BuyItemForm({submit, photoPath, itemName, itemPrice, itemDescription}) {
    return (
        <form method="post" onSubmit={submit}>
          <ItemSummary photoPath={photoPath} 
          itemName={itemName} itemPrice={itemPrice}
          itemDescription={itemDescription} />
        <h3>Quantity</h3>
        <input type="number" name="quantity" className="quantity"/>
        <h3>Address</h3>
        <input type="text" name="address" className="address"/><br/>
        <input type="submit" value="Place Order"/>
      </form>
    )
}

export default BuyItemForm;