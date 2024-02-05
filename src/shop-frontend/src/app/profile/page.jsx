"use client"
import { useState, useEffect } from 'react';
import Basket from '../components/orderItemsBasket';
import addOrder from '../lib/addOrder';
import ValidationError from '../lib/validationError';
import getUserData from '../lib/getUserData';

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [userBasket, setUserBasket] = useState(null);
  const [errorMessage, setError] = useState(null);

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
  

  useEffect(() => {
    getUserData('http://localhost:4040/api/v1/user/info', setUserData);
    getUserData('http://localhost:4040/api/v1/user/orders', setUserOrders);
    getUserData('http://localhost:4040/api/v1/user/basket', setUserBasket);

  }, []); // Run once on component mount

  var orders = null;
  if(userOrders){ 
    orders = userOrders.map( (order) => (
        <div key={order._id}>
          <p>Date: {order.date}</p>
          <p>Address: {order.address}</p>
          {order.items.map( (item) => (
            <div key={  item._id}>
              <p>Product: {item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.product.price}</p>
            </div>
          ))}
        </div>
        ));
  }

  var basket = null;
  if(userBasket){
    basket = <Basket items={userBasket.items} submit={buyFromBasket}/>;
  }
    
  return (
    <div>
      {userData && (
        <div>
          <h1>Profile</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user details as needed */}
          {orders && 
            <>
              <h1>Orders</h1>
              {orders}
            </>}
          {basket &&
            <>
              <h1>Basket</h1>
              {basket}
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </>}
        </div>
      )}
    </div>
  );
}
