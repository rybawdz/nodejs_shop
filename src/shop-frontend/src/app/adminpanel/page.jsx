"use client"
import { useState, useEffect } from 'react';
import ProductPanel from '../components/productPanel'
import processForm from '../lib/processForm';
import getUserData from '../lib/getUserData';

export default function Page() {
  const [userOrders, setUserOrders] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userBaskets, setUserBaskets] = useState(null);

  useEffect(() => {
    getUserData('http://localhost:4040/api/v1/admin/orders', setUserOrders);
    getUserData('http://localhost:4040/api/v1/admin/users', setUserData);
    getUserData('http://localhost:4040/api/v1/admin/baskets', setUserBaskets);
  }, [])

  var orders = null;
  if(userOrders){
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

  var users = null;
  if(userData){
    users = userData.map( (user) => (
        <div key={user._id}>
          <p>UserID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Profile Image: {user.profileImage}</p>
        </div>
        ));
  }

  var baskets = null;
  if(userBaskets){
    console.log(userBaskets);
    baskets = userBaskets.map( (basket) => (
        <div key={basket._id}>
          <p>UserID: {basket.user._id}</p>
          <p>Email: {basket.user.email}</p>
          {basket.items.map( (item) => (
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
    <h1>Users</h1>
    {users &&
      users}
    <h1>Baskets</h1>
    {baskets &&
      baskets}
  </>
  );
}
