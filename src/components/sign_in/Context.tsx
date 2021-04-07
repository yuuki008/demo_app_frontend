import React from 'react'
import { useState, useContext } from 'react'
import Router from 'next/router'
import { postSignin, postSignup } from '../utils/ApiClient'
import { swalAlert } from '../uikit/Alert'
import Cookies from 'universal-cookie'


type ContextValueType = {
  email: string
  password: string
  isPosting: boolean
  onSubmit: () => void
}

type ContextActionType = {
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
}

const SigninContext = React.createContext<ContextValueType & ContextActionType>({} as any)

export const useSigninContext = () => useContext(SigninContext)

export const SigninContextProvider: React.FC<PageProps> = ({ children, ...props }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPosting, setIsPosting] = useState(false)


  const onChangeEmail = (email: string) => setEmail(email)

  const onChangePassword = (password: string) => setPassword(password)


  const onSubmit = () => {
    localStorage.clear()
    setIsPosting(true)
    signInFetch()
  }

  const signInFetch = async () => {
    const result = await postSignin({email: email, password: password})
    if (result.success) {
      setCookies(result.body)
      Router.push('/')
      swalAlert('データを取得中です', 'success')
      return
    }
    setIsPosting(false)
    swalAlert('ログインできません', 'error')
  }


  const setCookies = (body: any) => {
    const cookies = new Cookies()
    cookies.set('access-token', body.access_token, { path: '/' })
    cookies.set('client', body.client, { path: '/' })
    cookies.set('uid', body.uid, { path: '/' })
  }

  const value = {
    email,
    password,
    isPosting,
    onChangePassword,
    onChangeEmail,
    onSubmit,
  }

  return <SigninContext.Provider value={value}>{children}</SigninContext.Provider>
}
