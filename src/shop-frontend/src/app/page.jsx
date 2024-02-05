"use client"
import ListProd from './components/ListProd';
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'

import NavBar from './components/navbar';
import StoreItem from './components/storeItem';
import StoreItemList from './components/storeItemList';
import getItems from './lib/getItems';
import { useState, ChangeEvent, useEffect } from "react";
import './styles/main.css';

// @refresh reset

export default  function Home() {
  const [itemData, setItemData] = useState([]);
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    let q = searchParams.get('q');
    console.log(q);
    fetch('http://localhost:4040/api/v1/product/search?name=' + q, {cache: "no-store"})
    .then((response) => response.json())
    .then((data) => {
      setItemData(data);
    })
  },[searchParams])
  return (
    <div key={router.asPath}>
       
      <NavBar />
      <div className='content'>
        <marquee>
          <h1>Hello, home page!</h1>
          </marquee>
          <ListProd  />
          <StoreItemList  items={itemData} />
        
      </div>
    </div>
  );
}
