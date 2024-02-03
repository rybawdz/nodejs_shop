"use client"
import { useState, useEffect } from 'react';

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState(null);

  async function getUserData(url, setFunction) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setFunction(data);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }
  

  useEffect(() => {
    getUserData('http://localhost:4040/api/v1/user/info', setUserData);
    getUserData('http://localhost:4040/api/v1/user/orders', setUserOrders);

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

    console.log(orders);
  }
    
  return (
    <div>
      {userData && (
        <div>
          <h1>Profile</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user details as needed */}
          {orders && 
            orders}
        </div>
      )}
    </div>
  );
}
