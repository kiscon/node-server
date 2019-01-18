/*
* 配置
* */
const config = {
  request_url: {
    base_api_url: 'https://api.douban.com/v2',
  },
	pwdSalt: '这是一个盐`~-=）（*&%★', // 加密的盐
  port: 4222,
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 1,
    pass: ''
  }
}
module.exports = config
