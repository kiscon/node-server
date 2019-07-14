const env = process.env.NODE_ENV
const config = require('./config')

let MYSQL_CONF
let REDISL_CONF

if (env === 'dev') {
	MYSQL_CONF = config.dev_mysqpl
	REDISL_CONF = config.dev_redis
}

if (env === 'prod') {
	MYSQL_CONF = config.prod_mysqpl
	REDISL_CONF = config.prod_redis
}

module.exports = {
	MYSQL_CONF,
	REDISL_CONF
}