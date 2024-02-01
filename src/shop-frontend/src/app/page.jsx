'use client'
import Button from './components/button';
import { useRouter } from 'next/navigation';
import NavBar from './components/navbar';
import StoreItem from './components/storeItem';
import './styles/main.css';

// Czy tylko ja mam glitcha, że jak wracam z login/signup 
// do głownej strony to wszystko się retarduje? (jak się przeładuje stronę to wraca do normy)
// Ja tez tak mam :/ nwm czemu tak jest

function Home() {
  const router = useRouter();
  return (
    <div>
    <NavBar/>
    <div className='content'>
    <marquee>
      {}
    <h1>Hello, home page!</h1>
    </marquee>
    {/* add photo request handling to routing */}
    <StoreItem photoPath='/photo.jpg' itemName="itemName" itemPrice="100" itemDescription="description"/>
    </div>
    {/* <Button text="log in" action={() => router.push("/login")}/> 
    <Button text="sign up" action={() => router.push("/signup")}/>  */}
    </div>
  );
}

export default Home;
