const prod = require('./env/prod.json')
const local = require('./env/local.json')

const checkEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    return prod
  } else if (process.env.NODE_ENV === 'local') {
    return local
  } else {
    return false
  }
}

module.exports = () => {
  return { env: checkEnvironment() }
}