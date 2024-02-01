import StoreItem from "./storeItem";

function storeItemList (items ){

  return (
    <div div className="storeItemList">
      <div>
      {items.items.map((item) => (
        <StoreItem item={item} />
      ))}
    </div>
    </div>);
  };

  export default storeItemList;
  /*
      return (
      <div div className="storeItemList">
        <div>
        {items.map((item) => (
          <StoreItem item={item} />
        ))}
      </div>
      </div>

    );*/