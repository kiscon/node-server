/*
* 配置
* */
const config = {
  request_url: {
    base_api_url: '',
  },
	pwdSalt: '加密的盐`~-=*&%★',
  port: 4222,
  dev_mysqpl: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'skyline',
  },
	prod_mysqpl: {
		host: '127.0.0.1',
		user: 'root',
		password: '123456',
		database: 'skyline',
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
	uploadImg: {
    'local_base_url': 'E:/testdemo/music-server/server/image', //需要自己手动在项目目录下创建
  }
}
module.exports = config
