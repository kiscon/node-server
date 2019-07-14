/*
* 功能：统一注册自定义路由
* */
const product = require('./product')
const user = require('./user')
const image = require('./image')

const indexSve = app => {
	app.use('/api/product', product)
	app.use('/api/user', user)
	app.use('/api/image', image)
}

module.exports = indexSve