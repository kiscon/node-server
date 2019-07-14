const crypto = require('crypto')
const config = require('../config/config')

// md5加密
const md5 = content => {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

const genPassword = password => {
  const str = `password=${password}&key=${config.pwdSalt}`
  return md5(str)
}

module.exports = {
  genPassword
}