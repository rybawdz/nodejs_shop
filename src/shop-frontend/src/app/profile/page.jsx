"use client"
import { useState, useEffect } from 'react';
import Basket from '../components/orderItemsBasket';
import addOrder from '../lib/addOrder';
import ValidationError from '../lib/validationError';
import getUserData from '../lib/getUserData';
import NavBar from '../components/navbar';
import UserOrders from '../components/userOrders';

import "../styles/main.css";
import "../styles/profileStyles.css";

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [userBasket, setUserBasket] = useState(null);
  const [errorMessage, setError] = useState(null);
  const [dataInfoContent, setDataInfoContent] = useState(null);
  const [ordersNavbarStyles, setOrdersNavbarStyles] = useState({ backgroundColor: '#B0C400' });
  const [basketNavbarStyles, setBasketNavbarStyles] = useState({ backgroundColor: '#B0C400' });
  

async function buyFromBasket(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if(userBasket) {
      try {
        const response = await addOrder(userBasket.items, formData)
        if(response.ok){
          // request clearing basket
          fetch('http://localhost:4040/api/v1/user/clearbasket', {
            method: 'GET',
            credentials: 'include',
          });
          location.reload();
        }
      } catch (error) {
        if(error instanceof ValidationError){
          setError(error.message);
        }
        else{
          throw(error);
        }
      }
    }
  }

  var orders = null;
  if (userOrders) {
    orders = (
      <UserOrders orders={userOrders}/>
    );
  }
  
  
  var basket = null;
  if(userBasket){
    basket =  <>
                <Basket items={userBasket.items} submit={buyFromBasket}/>;
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              </>
  }

  function displayData(data) {
    if(data == 'orders') {
      setDataInfoContent(orders);
      setOrdersNavbarStyles({ backgroundColor: '#D5DE2E' });
      setBasketNavbarStyles({ backgroundColor: '#B0C400' });
    }
    else if(data == 'basket') {
      setDataInfoContent(basket);
      setOrdersNavbarStyles({ backgroundColor: '#B0C400' });
      setBasketNavbarStyles({ backgroundColor: '#D5DE2E' });
    }

  }
  

  useEffect(() => {
    getUserData('http://localhost:4040/api/v1/user/info', setUserData);
    getUserData('http://localhost:4040/api/v1/user/orders', setUserOrders);
    getUserData('http://localhost:4040/api/v1/user/basket', setUserBasket);
  }, []); // Run once on component mount

    
  return (
    <div>
      <NavBar/>
      <div className='content'>

      {userData && (<>
        <div className='userData'>
          <div>
            <label className='metaText'>Email: </label> 
            <label className='userEmail'>{userData.email}</label>
          </div>
        </div>
        <div className='dataInfoNavbar'>
            <div className='ordersTile' style={ordersNavbarStyles} onClick={() => displayData('orders')}>
              <p>Orders</p>
            </div>
            <div className='basketTile' style={basketNavbarStyles} onClick={() => displayData('basket')}>
              <p>Basket</p>
            </div>
        </div>
        <div className='dataInfo'>
          {dataInfoContent}
        </div>
      </>)}
      </div>
    </div>
  );
}
