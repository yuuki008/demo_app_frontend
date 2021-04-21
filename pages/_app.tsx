import { AppContext, AppProps } from 'next/app'
import { useEffect } from 'react'
import { getAuth } from '../src/components/utils/ApiClient'
import { signIn, headerInfo, getHeaderInfo, selectUser } from '../src/slice/auth'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import store from '../src/slice/store'
import { Provider } from 'react-redux'

const MyApp = ({Component, pageProps, ...props}: any) => {

  useEffect(() => {
    if(props.user.sign_in === false) {
      Router.push('/sign_in')
    }
  }, [])

  try {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  } catch (error) {
    if(error){
      const errorLog = {
        path: window.location.href,
        error: `${error}`,
        id: props.user.info.userId
      }
      console.log(`${JSON.stringify(errorLog)}`)
      Router.push('sign_in')
    }
  }
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const getDispatch = async () => {
    const dispatch = useDispatch()
    getHeaderInfo(ctx)
    const result = await getAuth(headerInfo)
    let user = {}
    if(result.success && result.body && result.body.user_sign_in) {
      dispatch(signIn(result.body.user))
      user = { sign_in: true, info: result.body.user}
    } else {
      Router.push('sign_in')
      user = { sign_in: false}
    }
    return user
  }
  const user = getDispatch()
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps, user}
}

export default MyApp