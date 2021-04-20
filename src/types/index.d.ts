interface PageProps extends Props {
  state: State
  actions: Actions
}

interface HeaderInfo {
  'access-token': string
  client: string
  uid: string
}

interface User {
  sign_in: boolean
  info: any
}