'use client'
import { useRouter } from 'next/navigation'

function Button({placeholder, text, action, type}) {
  const router = useRouter()
  var typeVal = type ? type : 'button'
  return <button placeholder={placeholder} type={typeVal} onClick={action ? action : () => null}>{text}</button>;
}

export default Button;