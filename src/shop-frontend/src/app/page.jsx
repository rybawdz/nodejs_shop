'use client'
import Button from './components/button';
import { useRouter } from 'next/navigation';
import NavBar from './components/navbar';
import StoreItem from './components/storeItem';
import './styles/main.css';

function Home() {
  const router = useRouter();
  return (
    <div>
    <NavBar/>
    <div className='content'>
    <marquee>
    <h1>Hello, home page!</h1>
    </marquee>
    {/* add photo request handling to routing */}
    <StoreItem photoPath='/img/photo.jpg' itemName="itemName" itemPrice="100"/>
    </div>
    {/* <Button text="log in" action={() => router.push("/login")}/> 
    <Button text="sign up" action={() => router.push("/signup")}/>  */}
    </div>
  );
}

export default Home;
