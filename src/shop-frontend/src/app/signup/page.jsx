"use client";

import signUp from "../lib/signUp"
import { useRouter } from 'next/navigation';
import SignupForm from "../components/signupForm";
import React, { useState } from 'react'
import '../styles/main.css'
import '../styles/loginSignupStyles.css'
import AuthError from "../lib/authError"



export default function Page() {
  const router = useRouter();
  async function register(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    try {
      
      const response = await signUp(formData);
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
      <SignupForm submit={register}/>
    </div>
  );

}