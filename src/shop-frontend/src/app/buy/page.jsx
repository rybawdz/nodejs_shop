"use client";

import { useEffect, useState } from "react";
import ItemSummary from "../components/itemSummary";
import '../styles/main.css';
import { useRouter } from "next/navigation";

export default function Page() {
  const [itemData, setItemData] = useState([]);
  const item = new URLSearchParams(window.location.search);

  useEffect(() => {
    fetch('http://localhost:4040/api/v1/product/search?name=' + item.get("item"), { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
      });
  }, []);

  const router = useRouter();
  async function placeOrder(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await addOrder(formData);
      router.push('/')
    } catch (error) {
      throw(error);
    }
  }

  const [errorMessage, setError] = useState(null);

  return (
    <div className="content">
      <form method="post" onSubmit={placeOrder}>
        {itemData[0] != undefined &&
          <ItemSummary photoPath={"../" + itemData[0].photoUrl} 
          itemName={itemData[0].name} itemPrice={itemData[0].price}
          itemDescription={itemData[0].description} />
        } 
        <p>Quantity</p>
        <input type="number" className="quantity"/>
        <p>Address</p>
        <input type="text" className="address"/>
        <input type="submit" value="Place Order"/>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </form>
    </div>
  );
}
