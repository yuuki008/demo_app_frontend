import { AppContext, AppProps } from 'next/app'
import { getAuth } from '../src/components/utils/ApiClient'
import { signIn, headerInfo, getHeaderInfo } from '../src/slice/auth'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import store from '../src/slice/store'
import { Provider } from 'react-redux'
import { StoreProvider } from './provider'
import '../src/assets/index.css'

const MyApp = ({Component, pageProps, router, ...props}: any) => {
  try {
    return (
      <Provider store={store}>
        <StoreProvider router={router}>
          <Component {...pageProps} />
        </StoreProvider>
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
  getAuthetication(ctx)
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

const getAuthetication = async (ctx) => {
  const dispatch = useDispatch()
  getHeaderInfo(ctx)
  const result = await getAuth(headerInfo)
  if (result.success && result.body && result.body.user_sign_in) {
    dispatch(signIn(result.body.user))
  } else {
    Router.push('sign_in')
  }
  return <></>
}


export default MyApp