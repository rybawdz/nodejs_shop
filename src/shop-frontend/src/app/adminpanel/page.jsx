"use client"
import { useState, useEffect } from 'react';
import ProductPanel from '../components/productPanel'
import processForm from '../lib/processForm';
import getUserData from '../lib/getUserData';

export default function Page() {
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    getUserData('http://localhost:4040/api/v1/admin/orders', setUserOrders);
  }, [])

  var orders = null;
  if(userOrders){ 
    console.log(userOrders);
    orders = userOrders.map( (order) => (
        <div key={order._id}>
          <p>UserID: {order.user._id}</p>
          <p>Email: {order.user.email}</p>
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

  return (
  <>
    <ProductPanel submit={processForm} />
    <h1>Orders</h1>
    {orders && 
      orders}
  </>
  );
}
