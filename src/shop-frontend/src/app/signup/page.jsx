"use client";

import signIn from "../lib/signIn"
import TextBox from "../components/textbox";
import Button from "../components/button";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

async function register(prevState, formData) {

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'PasswordMatch':
          return 'Passwords do not match.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export default function Page() {
  const [errorMessage, dispatch] = useFormState(register, undefined);
  const { pending } = useFormStatus();
  return (
    <div>
      <h1>Hello, signup page!</h1>
      <form action={dispatch}>
        <TextBox placeholder="Enter email" type="email" name="username" /> <br></br>
        <TextBox placeholder="Enter password" type="text" name="password" /> <br></br>
        <TextBox placeholder="Confirm password" type="text" name="confirmpwd" /> <br></br>
        <Button type="submit" text="Submit" aria-disabled={pending} />
        <div
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
