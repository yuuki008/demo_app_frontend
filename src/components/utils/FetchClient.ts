
type Method = 'get' | 'post' | 'patch' | 'put' | 'delete'

export interface CommonResult<T> {
  success: boolean
  status: number
  body?: T
}

const BASE_URL = process.env.API_BASE

export const commonRequest = <T>(
  endpoint: string,
  method: Method,
  params: object,
  headerInfo?: object
): Promise<CommonResult<T>> => {
  const headers = {
    'Content-Type': 'application/json',
    ...headerInfo
  }

  let options: any = {
    method,
    headers,
    credentials: 'same-origin'
  }

  if(method !== 'get') {
    options = {
      ...options,
      body: JSON.stringify(params)
    }
  }
  return fetchClient(BASE_URL + endpoint, options)
}

const fetchClient = (url: string, options: object) => {
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
      return { success: false, status: 404, body: e.value}
    }) as any
}