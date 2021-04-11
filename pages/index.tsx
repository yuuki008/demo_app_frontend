import { useEffect } from "react"
export default function Home() {
  const BASE_URL = process.env.API_BASE

  const headers = {
    'Content-Type': 'application/json',
  }

  const method = 'get'
  useEffect(() => {
    let options: any = {
      method,
      headers,
      credentials: 'same-origin',
    }
    fetchClient(`${BASE_URL}`, options)
  },[])
  const fetchClient = (url: string, options: object) => {
    console.log(url, options)
    return fetch(url, options)
      .then((res:any) => {
        const status = res.status
        if(status !== 200) {
          return { success: true, status}
        }
        return res.json().then((body: any) => {
          return { success: true, status, body}
        })
      })
      .catch((e: any) => {
        console.log(e.value)
        return { success: false, status: 404, body: e.value}
      }) as any
  }
  return (
    <div>hello world!!</div>
  )
}

