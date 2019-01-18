const express = require('express')
const userCtrl =  require('../controller/userCtrl')
const router = express.Router()

router
	.post('/getAllUsers', userCtrl.getAllUsers) // 获取用户信息列表
	.post('/add', userCtrl.addUser) // 新增用户
	.post('/login', userCtrl.loginUser) // 用户登录
	.post('/logOut', userCtrl.logOut) // 退出登录
	.post('/cancellation', userCtrl.cancellationUser) // 注销用户

module.exports = router
