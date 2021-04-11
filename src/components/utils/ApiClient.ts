import { commonRequest, CommonResult } from './FetchClient'
import Cookies from 'universal-cookie'

export const postSignup = (params: {
  username: string
  nickname: string
  email: string
  password: string
  passwordConfirmation: string
}): Promise<CommonResult<{
  access_token: string
  client: string
  uid: string
}>> => commonRequest('auth', 'post', params)

export const postSignin = (params: {
  email: string
  password: string
}): Promise<CommonResult<{
  access_token: string
  client: string
  uid: string
}>> => commonRequest('auth/sign_in', 'post', params)

export const Signout = (
  headerInfo: HeaderInfo
): Promise<CommonResult<{ success: boolean }>> => {
  const cookies = new Cookies()
  Object.keys(cookies.getAll()).map((key: string) => {
    cookies.remove(key, { path: '/' })
  })
  return commonRequest('auth/sign_out', 'delete', {}, headerInfo)
}

export const passwordUpdate = (
  params: {
    password: string
    password_confirmation: string
  },
  headerInfo: HeaderInfo
): Promise<CommonResult<{ success: boolean; data: any; message: string }>> =>
  commonRequest('auth/password', 'put', params, headerInfo)

export const getAuth = (
  headerInfo: HeaderInfo
): Promise<CommonResult<{
  user: string
  user_sign_in: boolean
  message: string
}>> => commonRequest('/', 'get', {}, headerInfo)