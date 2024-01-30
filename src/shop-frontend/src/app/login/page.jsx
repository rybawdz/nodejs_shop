"use client";

import signUp from "../lib/signIn"
import { useRouter } from 'next/navigation';
import SignupForm from "../components/signupForm";
import React, { useState, FormEvent } from 'react'
import '../styles/main.css'
import '../styles/loginSignupStyles.css'
import AuthError from "../lib/authError"



export default function Page() {
  const router = useRouter();
  async function login(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    try {
      
      const response = await signUp(formData);
      document.cookie = response.headers.get('Set-Cookie');
      router.push('/');
      

    } catch (error) {
      if(error instanceof AuthError){
        setError(error.message);
      }
      else{
        throw(error);
      }

    }
  }

  const [errorMessage, setError] = useState(null);

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={login}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit" >Submit</button>
      </form>
    </div>
  );

}