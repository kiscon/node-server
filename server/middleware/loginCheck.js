const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  console.log(req.session)
  if (!req.session || !req.session.accountInfo ||  req.session.accountInfo.userInfo) {
    res.json(new ErrorModel('未登录'))
  }
  let accountInfo = req.session.accountInfo
  if (accountInfo.userInfo.user_name) {
    next()
    return
  }
}