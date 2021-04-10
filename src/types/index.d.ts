interface PageProps extends Props {
  state: State
  actions: Actions
}

interface HeaderInfo {
  'access-token': string
  client: string
  uid: string
}