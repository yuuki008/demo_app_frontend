import { AppContext, AppProps } from 'next/app'
import { useEffect } from 'react'
import { getAuth } from '../src/components/utils/ApiClient'
import { signIn, headerInfo, getHeaderInfo, selectUser } from '../src/slice/auth'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'

const dispatch = useDispatch()
const MyApp = ({Component, pageProps}: AppProps) => {
  const user:User = useSelector(selectUser)

  useEffect(() => {
    if(user.sign_in === false) {
      Router.push('/sign_in')
    }
  }, [])

  try {
    return(
      <Component {...pageProps} />
    )
  } catch (error) {
    if(error){
      const errorLog = {
        path: window.location.href,
        error: `${error}`,
        id: user.info.userId
      }
      console.log(`${JSON.stringify(errorLog)}`)
      Router.push('sign_in')
    }
  }
}

MyApp.getInitialProps = async({ Component, ctx }: AppContext) => {
  getHeaderInfo(ctx)
  const result = await getAuth(headerInfo)
  if(result.success && result.body && result.body.user_sign_in) {
    dispatch(signIn(result.body.user))
  } else {
    Router.push('sign_in')
  }
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}
