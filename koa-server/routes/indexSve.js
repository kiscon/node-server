/*
* 功能：统一注册自定义路由
* */
const user = require('./user')

const indexSve = app => {
	app.use(user.routes(), user.allowedMethods())
}

module.exports = indexSve