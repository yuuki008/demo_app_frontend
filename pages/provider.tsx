import { useEffect } from 'react'
import { selectUser } from '../src/slice/auth'
import { useSelector } from 'react-redux'
import Router from 'next/router'

type Props = {
  children: JSX.Element
  router: any
}

export const StoreProvider = (props: Props) => {
  const user = useSelector(selectUser)

  useEffect(() => {
    if (user.sign_in === false) {
      Router.push('/sign_in')
    }
  }, [props.router.pathname])

  return props.children
}
