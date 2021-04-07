type HeaderInfo = {
  'access-token': string
  client: string
  uid: string
}

interface State {
  graphCache: any
}

interface Actions {
  setGraphCache: (graphCache: any) => void
}

interface PageProps extends Props {
  state: State
  actions: Actions
}