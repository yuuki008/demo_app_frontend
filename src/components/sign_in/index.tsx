import { NextPage } from 'next'
import { Layout } from './Layout'
import { SigninContextProvider } from './Context'

export const Page: NextPage<PageProps> = (props) => {
  return (
    <SigninContextProvider {...props}>
      <Layout />
    </SigninContextProvider>
  )
}