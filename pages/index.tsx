import { useEffect } from "react"
export default function Home() {
  const BASE_URL = process.env.API_BASE

  const headers = {
    'Content-Type': 'application/json',
  }

  const method = 'get'
  useEffect(() => {
  },[])
  return (
    <div>hello world!!</div>
  )
}

