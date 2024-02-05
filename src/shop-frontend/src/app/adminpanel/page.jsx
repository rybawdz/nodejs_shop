"use client"
import { useState, useEffect } from 'react';
import ProductPanel from '../components/productPanel'
import processForm from '../lib/processForm';
import getUserData from '../lib/getUserData';
import NavBar from '../components/navbar';

import '../styles/main.css';
import '../styles/profileStyles.css';

export default function Page() {
  const [userOrders, setUserOrders] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userBaskets, setUserBaskets] = useState(null);
  const [ordersNavbarStyles, setOrdersNavbarStyles] = useState({ backgroundColor: '#B0C400' });
  const [basketsNavbarStyles, setBasketsNavbarStyles] = useState({ backgroundColor: '#B0C400' });
  const [productNavbarStyles, setProductNavbarStyles] = useState({ backgroundColor: '#B0C400' });
  const [usersNavbarStyles, setUsersNavbarStyles] = useState({ backgroundColor: '#B0C400' });
  const [dataInfoContent, setDataInfoContent] = useState(null);

  useEffect(() => {
    getUserData('http://localhost:4040/api/v1/admin/orders', setUserOrders);
    getUserData('http://localhost:4040/api/v1/admin/users', setUserData);
    getUserData('http://localhost:4040/api/v1/admin/baskets', setUserBaskets);
  }, [])

  var orders = null;
  if(userOrders){
    orders = userOrders.map( (order) => (
        <div key={order._id} className='orderAdminTile'>
          <div className='orderTileTitle'>
            <p><label className='metaText'>UserID: </label>{order.user._id}</p>
            <p><label className='metaText'>Email: </label>{order.user.email}</p>
            <p><label className='metaText'>Date: </label>{order.date}</p>
            <p><label className='metaText'>Address: </label>{order.address}</p>
          </div>
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
        <div key={user._id} className='userAdminTile'>
          <p><label className='metaText'>UserID: </label>{user._id}</p>
          <p><label className='metaText'>Email: </label>{user.email}</p>
          <p><label className='metaText'>Role: </label>{user.role}</p>
          <p><label className='metaText'>Profile Image: </label>{user.profileImage}</p>
        </div>
        ));
  }

  var baskets = null;
  if(userBaskets){
    baskets = userBaskets.map( (basket) => (
        <div key={basket._id} className='basketAdminTile'>
          <div className='userTitleTile'>
            <p><label className='metaText'>UserID: </label>{basket.user._id}</p>
            <p><label className='metaText'>Email: </label>{basket.user.email}</p>
          </div>
          {basket.items.map( (item) => (
            <div key={  item._id}>
              <p><label className='metaText'>Product: </label>{item.product.name}</p>
              <p><label className='metaText'>Quantity: </label>{item.quantity}</p>
              <p><label className='metaText'>Price: </label>{item.product.price}</p>
            </div>
          ))}
        </div>
        ));
  }
      
  var product = <ProductPanel submit={processForm} />;
  
  // wybacz, że kod z takimi powtórzeniami 
  // ale obecnie mam energię mentalną na wykończeniu

  function displayData(data) {
    setBasketsNavbarStyles({ backgroundColor: '#B0C400' });
    setOrdersNavbarStyles({ backgroundColor: '#B0C400' });
    setUsersNavbarStyles({ backgroundColor: '#B0C400' });
    setProductNavbarStyles({ backgroundColor: '#B0C400' });
    if(data == 'orders') {
      setDataInfoContent(orders);
      setOrdersNavbarStyles({ backgroundColor: '#D5DE2E' });
    }
    else if(data == 'baskets') {
      setDataInfoContent(baskets);
      setBasketsNavbarStyles({ backgroundColor: '#D5DE2E' });
    }
    else if(data == 'users') {
      setDataInfoContent(users);
      setUsersNavbarStyles({ backgroundColor: '#D5DE2E' });
    }
    else if(data == 'product') {
      setDataInfoContent(product);
      setProductNavbarStyles({ backgroundColor: '#D5DE2E' });
    }

  }

  return (
  <>
    <NavBar/>
    <div className='content'>
      <div className='dataInfoNavbar'>
              <div className='ordersTile' style={productNavbarStyles} onClick={() => displayData('product')}>
                <p>Product</p>
              </div>
              <div className='ordersTile' style={usersNavbarStyles} onClick={() => displayData('users')}>
                <p>Users</p>
              </div>
              <div className='ordersTile' style={ordersNavbarStyles} onClick={() => displayData('orders')}>
                <p>Orders</p>
              </div>
              <div className='basketTile' style={basketsNavbarStyles} onClick={() => displayData('baskets')}>
                <p>Baskets</p>
              </div>
      </div>
      <div className='dataInfo'>
        {dataInfoContent}
      </div>
    </div>
  </>
  );
}
