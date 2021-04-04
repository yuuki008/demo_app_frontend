import { useEffect } from "react"

export const Page = () => {
  const BASE_URL = process.env.API_BASE
  const account = {
    name: 'test1',
    email: "test1@gmail.com",
    nickname: '1',
    password: 'password',
    password_confirmation: 'password'
  }

  const headers = {
    'Content-Type': 'application/json',
  }

  const method = 'POST'
  useEffect(() => {
    let options: any = {
      method: 'post',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(account)
    }
    fetchClient(`${BASE_URL}/auth`, options)
  },[])
  return(
    <h1>sign_up</h1>
  )
}


const fetchClient = (url: string, options: object) => {
  return fetch(url, options)
    .then((res:any) => {
      console.log(res)
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
