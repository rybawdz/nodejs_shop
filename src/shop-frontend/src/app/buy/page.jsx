"use client";

import { useEffect, useState } from "react";
import '../styles/main.css';
import { useRouter } from "next/navigation";
import ValidationError from "../lib/validationError";
import BuyItemForm from "../components/buyItemForm";
import addOrder from "../lib/addOrder";

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
    const item = itemData[0] == undefined ? null : itemData[0];

    try {
      const response = await addOrder(item, formData);
      router.push('/')
    } catch (error) {
      if(error instanceof ValidationError){
        setError(error.message);
      }
      else{
        throw(error);
      }
    }
  }

  const [errorMessage, setError] = useState(null);

  var result = "";
  if(itemData[0] != undefined) {
    result = <BuyItemForm submit={placeOrder} 
                          photoPath={"../" + itemData[0].photoUrl}
                          itemName={itemData[0].name}
                          itemPrice={itemData[0].price}
                          itemDescription={itemData[0].description}/>
  }
  else
  {
    result = <h1>Invalid item name</h1>
  }

  return (
    <div className="content">
      {result}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
}
