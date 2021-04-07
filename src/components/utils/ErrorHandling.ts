export const handleErrors = (status: number) => {
  switch (status) {
    case 400:
      return 'INVALID_TOKEN'
    case 401:
      return 'UNAUTHORIZED'
    case 500:
      return 'INTERNAL_SERVER_ERROR'
    case 502:
      return 'BAD_GATEWAY'
    case 404:
      return 'NOT_FOUND'
    default:
      return 'UNHANDLED_ERROR'
  }
}
