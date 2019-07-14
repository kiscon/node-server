const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  console.log(req.session)
  let accountInfo = req.session.accountInfo
  if (accountInfo.userInfo.user_name) {
    next()
    return
  }
  res.json(new ErrorModel('未登录'))
}