"use client"
import ListProd from './components/ListProd';
import NavBar from './components/navbar';
import StoreItem from './components/storeItem';
import StoreItemList from './components/storeItemList';
import getItems from './lib/getItems';
import { useState, ChangeEvent, useEffect } from "react";
import './styles/main.css';



export default  function Home() {
  "use client"
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let q = urlParams.get('q');
    if(!q) q = '';
    fetch('http://localhost:4040/api/v1/product/search?name=' + q, {cache: "no-store"})
    .then((response) => response.json())
    .then((data) => {
      setItemData(data);
    })
  },[window.location.search])
  return (
    <div>
      <NavBar />
      <div className='content'>
        <marquee>
          <h1>Hello, home page!</h1>
          </marquee>
          <ListProd/>
          <StoreItemList items={itemData} />
        
      </div>
    </div>
  );
}
//<StoreItemList items={itemData} />