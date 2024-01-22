'use client'
import Button from './components/button';
import { useRouter } from 'next/navigation';
import NavBar from './components/navbar';
import './styles/main.css'

function Home() {
  const router = useRouter();
  return (
    <div>
    <NavBar></NavBar>
    <div className='content'>
    <marquee>
    <h1>Hello, home page!</h1>
    </marquee>

    </div>
    {/* <Button text="log in" action={() => router.push("/login")}/> 
    <Button text="sign up" action={() => router.push("/signup")}/>  */}
    </div>
  );
}

export default Home;
