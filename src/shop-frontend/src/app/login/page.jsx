"use client";

import TextBox from "../components/textbox";
import Button from "../components/button";
import React from "react";
import { useFormState, useFormStatus } from 'react-dom';

async function handleForm(prevState, formData) {
    email = formData.get('email');
    password = formData.get('password')
}

export default function Page() {
  const [errorMessage, dispatch] = useFormState(handleForm, undefined);
  const { pending } = useFormStatus();
  return (
    <div>
      <h1>Hello, login page!</h1>
      <form action={dispatch}>
        <TextBox placeholder="Enter email" type="text" name="username" />
        <Button type="submit" text="Submit" aria-disabled={pending} />
      </form>
    </div>
  );
}
