const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
  if (!ctx.session || !ctx.session.accountInfo || !ctx.session.accountInfo.userInfo) {
    ctx.body = new ErrorModel('未登录')
    return
  }
  let accountInfo = ctx.session.accountInfo
  if (accountInfo.userInfo.user_name) {
    await next()
    return
  }
}