import '../src/assets/index.css'
import App, { AppContext, AppInitialProps } from 'next/app'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import { getAuth } from '../src/components/utils/ApiClient'

export interface HeaderInfo {
  'access-token': string
  client: string
  uid: string
}


export interface AppProps {
  user?: any
  headerInfo: HeaderInfo
}

interface Props extends AppProps {
  router: typeof Router
}

interface State {
  graphCache: any
}

interface Actions {
  setGraphCache: (graphCache: any) => void
}

export interface PageProps extends Props {
  state: State
  actions: Actions
}

export default class MyApp extends App<Props, State> {
  static async getInitialProps({ Component, ctx}: AppContext): Promise<AppInitialProps & AppProps> {
    const headerInfo = this.getHeaderInfo(ctx)
    const user = await this.checkAuth(headerInfo)
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps, user, headerInfo}
  }
  state: State = {
    graphCache: undefined
  }

  actions: Actions = {
    setGraphCache: (graphCache: any) => this.setState( { graphCache }),
  }

  static getHeaderInfo = (ctx: any): HeaderInfo => {
    const cookies = new Cookies(ctx.req && ctx.req.headers.cookie)
    const headerInfo = {
      'access-token': cookies.get('access-token'),
      client: cookies.get('client'),
      uid: cookies.get('uid'),
    }
    return headerInfo
  }

  static checkAuth = async (headerInfo: HeaderInfo) => {
    console.log(headerInfo)
    const result = await getAuth(headerInfo)
    console.log(result)
    if (result.success && result.body && result.body.user_sign_in) {
      console.log('---------サインインできたデー-----------', result.body.user_sign_in)
      console.log('---------ユーザー情報やでー-------------', result.body.user)
      return { sign_in: true, info: result.body.user }
    } else {
      console.log('---------サインイン失敗したでー-----------', false)
      return { sign_in: false }
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    if (this.props.user.sign_in === false) {
      Router.push('/sign_in')
    }
  }

  componentDidCatch(error: any) {
    if (error) {
      const errorLog = {
        path: window.location.href,
        error: `${error}`,
        id: this.props.user.userId,
      }
      console.log(`${JSON.stringify(errorLog)}`)
      Router.push('/sign_in')
    }
  }

  render(){
    const { Component, pageProps, ...otherProps } = this.props
    return <Component {...pageProps} {...otherProps} state={this.state} actions={this.actions} />
  }
}
