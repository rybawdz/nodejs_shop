"use client";

import signUp from "../lib/signUp"
import TextBox from "../components/textbox";
import Button from "../components/button";
import SignupForm from "../components/signupForm";
import React, { useState, FormEvent } from 'react'
import '../styles/main.css'
import '../styles/loginSignupStyles.css'
import AuthError from "../lib/authError"



export default function Page() {

  async function register(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    try {
      
      await signUp(formData);
    } catch (error) {
        setError(error.message)

    }
  }

  const [errorMessage, setError] = useState(null);

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={register}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="password" name="confirmpwd" />
        <button type="submit" >Submit</button>
      </form>
    </div>
  );

}