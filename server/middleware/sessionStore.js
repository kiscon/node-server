const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const config = require('../config/config')
const redisClient = require('../db/redis')

const session_store = new RedisStore({
  client: redisClient
})

const sessionStore = app => {
  app.use(session({
    name : 'seed.sid',
    secret : config.pwdSalt,
    resave : true, // 强制将会话保存回会话存储
    rolling: true, // 实时更新时间
    saveUninitialized : true, // 强制没有“初始化”的session保存到storage中
    cookie :{
      maxAge: 1800000, // 30 * 60 * 1000，即30分钟
      secure: false // 默认情况下，不设置安全属性
    },
    store: session_store
    // store : new RedisStore({
    //   host: config.redis.host,
    //   port: config.redis.port,
    //   pass: config.redis.pass,
    //   db: config.redis.db,
    //   // ttl: 1800, // Session的有效期
    //   logErrors: true
    // })
  }))
  app.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error('oh no')) // handle error
    }
    next() // otherwise continue
  })
}


module.exports = sessionStore

// 1. ttl: 过期时间，默认是session.maxAge, 或者是一天
// 2. disableTTL: 是否允许redis的key有过期时间。这个值优先于ttl
// 3. db: redis哪个数据库，默认是0
// 4. pass: 密码
// 5. prefix: key的前缀，默认是 'sess:'
// 6. unref: 这个方法作用于底层socket连接，可以在程序没有其他任务后自动退出。
// 7. serializer: 包含stringify和parse的方法，用于格式化存入redis的值。默认是JSON
// 8. logErrors: 是否打印redis出错信息，默认false
//    如果值为true，则会提供一个默认的处理方法（console.error）;
//    如果是一个函数，则redis的报错信息由它来处理
//    如果值为false，则不处理出错信息


// app.get('/login', function(req, res, next) {
//   // 从数据库中比对账号验证是否成功，如成功保存用户信息
//   let user = {
//     name: 'Chen-xy',
//     age: '22',
//     address: 'bj'
//   }
//   req.session.user = user
//   res.json('登陆成功')
// })
//
// app.get('/logOut', function(req, res, next) {
//   // 从数据库中比对账号验证是否成功，如成功保存用户信息
//   console.log(req.session)
//   res.json('退出')
// })
//
// app.listen(3000, () => {
//   console.log('http://127.0.0.1:3000')
// })

// https://www.jianshu.com/p/4115bf9c37d7
// https://github.com/tj/connect-redis
// https://github.com/expressjs/session