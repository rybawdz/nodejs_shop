'use client'
import { useRouter } from 'next/navigation'


function Button({ text, url}) {
  const router = useRouter()
  return <button onClick={url ? () => router.push(url): () => null}>{text}</button>;
}

export default Button;