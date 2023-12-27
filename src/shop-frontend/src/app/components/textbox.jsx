"use client";

function TextBox({ defaultText, type, name }) {
  return <input type={type} name={name} value={defaultText} required></input>;
}

export default TextBox;
