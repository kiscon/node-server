const router = require('koa-router')()
// const { login } = require('../controller/user')
// const { SuccessModel, ErrorModel } = require('../model/resModel')
const user =  require('../controller/user')
const loinCheck =  require('../middleware/loginCheck')

router.prefix('/api/user')

router
	.post('/getAllUsers', loinCheck, user.getAllUsers) // 获取用户信息列表
	.post('/add', user.addUser) // 新增用户
	.post('/login', user.loginUser) // 用户登录
	.post('/logOut', user.logOut) // 退出登录
	.post('/cancellation', loinCheck, user.cancellationUser) // 注销用户

module.exports = router
