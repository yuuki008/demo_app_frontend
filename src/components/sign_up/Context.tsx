import React from 'react'
import { useState, useContext } from 'react'
import Router from 'next/router'
import { postSignup } from '../utils/ApiClient'
import { swalAlert } from '../uikit/Alert'
import Cookies from 'universal-cookie'


type ContextValueType = {
  username: string
  nickname: string
  email: string
  password: string
  passwordConfirmation: string
  isPosting: boolean
  onSubmit: () => void
}

type ContextActionType = {
  onChangeUsername: (username: string) => void
  onChangeNickname: (nickname: string) => void
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
  onChangePasswordConfirmation: (passwordConfirmation: string) => void
}

const SignupContext = React.createContext<ContextValueType & ContextActionType>({} as any)

export const useSignupContext = () => useContext(SignupContext)

export const SignupContextProvider: React.FC<PageProps> = ({ children, ...props }) => {
  // valueの定義
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  const onChangeUsername = (username: string) => setUsername(username)

  const onChangeNickname = (nickname: string) => setNickname(nickname)

  const onChangeEmail = (email: string) => setEmail(email)

  const onChangePassword = (password: string) => setPassword(password)

  const onChangePasswordConfirmation = (passwordConfirmation: string) => setPasswordConfirmation(passwordConfirmation)

  const onSubmit = () => {
    localStorage.clear()
    setIsPosting(true)
    sigUpFetch()
  }

  const sigUpFetch = async () => {
    const result = await postSignup({username, nickname, email, password, passwordConfirmation})
    if (result.success) {
      setCookies(result.body)
      Router.push('/')
      swalAlert('データを取得中です', 'success')
      return
    }
    setIsPosting(false)
    swalAlert('登録できませんでした', 'error')
  }

  const setCookies = (body: any) => {
    const cookies = new Cookies()
    cookies.set('access-token', body.access_token, { path: '/' })
    cookies.set('client', body.client, { path: '/' })
    cookies.set('uid', body.uid, { path: '/' })
  }

  const value = {
    username,
    nickname,
    email,
    password,
    passwordConfirmation,
    isPosting,
    onChangeUsername,
    onChangeNickname,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirmation,
    onSubmit,
  }

  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
}
