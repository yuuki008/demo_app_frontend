import { NextPage } from 'next'
import { Layout } from './Layout'
import { SignupContextProvider } from './Context'

export const Page: NextPage<PageProps> = (props) => {
  return (
    <SignupContextProvider {...props}>
      <Layout />
    </SignupContextProvider>
  )
}