/*
* 功能：统一注册自定义路由
* */
const productSve = require('./productSve');
const movieSve = require('./movieSve');
const userSve = require('./userSve');
const imageSve = require('./imageSve');

const indexSve = (app) => {
	app.use('/api/productSve', productSve);
	app.use('/movieSve', movieSve);
	app.use('/api/userSve', userSve);
	app.use('/api/imageSve', imageSve);
}

module.exports = indexSve;