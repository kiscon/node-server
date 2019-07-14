/*
* 配置
* */
const config = {
  request_url: {
    base_api_url: '',
  },
	pwdSalt: '这是一个盐`~-=）（*&%★', // 加密的盐
  port: 4222,
  dev_mysqpl: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'music',
  },
	prod_mysqpl: {
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		database: 'music',
	},
	dev_redis: {
		host: '127.0.0.1',
		port: 6379,
		db: 1,
		pass: ''
	},
	prod_redis: {
		host: '127.0.0.1',
		port: 6379,
		db: 1,
		pass: ''
	},
}
module.exports = config
