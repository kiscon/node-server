const redis = require('redis')
const { REDISL_CONF } = require('../config/db')

//设置项
const RDS_OPTS = {
	// password: REDISL_CONF.pass,
	db: REDISL_CONF.db,
}
const redisClient = redis.createClient(
	REDISL_CONF.port,
	REDISL_CONF.host,
	RDS_OPTS
)

redisClient.on('error', err => {
	console.log(err)
})

module.exports = redisClient

// https://github.com/NodeRedis/node_redis