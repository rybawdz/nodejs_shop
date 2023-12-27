'use client'
import Button from './components/button';
import { useRouter } from 'next/navigation'

function Home() {
  const router = useRouter();
  return (
    <div>
    <h1>Hello, home page!</h1>
    <Button text="log in" action={() => router.push("/login")}/> 
    <Button text="sign up" action={() => router.push("/signup")}/> 
    </div>
  );
}

export default Home;
