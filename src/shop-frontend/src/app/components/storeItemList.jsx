import StoreItem from "./storeItem";

function storeItemList(items) {

  return (
    <div>
        {items.items.map((item) => (
          <div key={item._id}>
            <StoreItem item={item} />
          </div>
        ))}
    </div>);
};

export default storeItemList;
