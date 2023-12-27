"use client";

import TextBox from "../components/textbox";
import Button from "../components/button";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

async function signUp(prevState, formData) {
  var email = formData.get("email");
  var password = formData.get("password");
  var confirmpwd = formData.get("confirmpwd");

  if (password != confirmpwd) {
    return "Passwords do not match.";
  }
}

export default function Page() {
  const [errorMessage, dispatch] = useFormState(signUp, undefined);
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
