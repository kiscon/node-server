const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const sessionStore = (app) => {
  app.use(session({
    name : 'seed.sid',
    secret : 'Asecret123-',
    resave : true, // 强制将会话保存回会话存储
    rolling: true, // 实时更新时间
    saveUninitialized : true, // 强制没有“初始化”的session保存到storage中
    cookie :{
      maxAge: 1800000, // 30 * 60 * 1000，即30分钟
      secure: false // 默认情况下，不设置安全属性
    },
    store : new RedisStore({
      host: '127.0.0.1',
      port: 6379,
      pass: '',
      db: 1,
      // ttl: 1800, // Session的有效期
      logErrors: true
    })
  }))
  app.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error('oh no')) // handle error
    }
    next() // otherwise continue
  })
}


module.exports = sessionStore;

//
// app.get('/login', function(req, res, next) {
//   // 从数据库中比对账号验证是否成功，如成功保存用户信息
//   let user = {
//     name: 'Chen-xy',
//     age: '22',
//     address: 'bj'
//   }
//   req.session.user = user;
//   res.json('登陆成功')
// });
//
// app.get('/logOut', function(req, res, next) {
//   // 从数据库中比对账号验证是否成功，如成功保存用户信息
//   console.log(req.session)
//   res.json('退出')
// });
//
// app.listen(3000, () => {
//   console.log('http://127.0.0.1:3000')
// })


// https://github.com/tj/connect-redis
// https://github.com/expressjs/session