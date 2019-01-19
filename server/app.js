const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejs = require('ejs')
// const logger = require('morgan')
// const session = require('express-session')
const index = require('./routes/index')
const indexSve = require('./routes/indexSve')
const logger = require('./logger/logger')
const sessionStore = require('./model/session-store')
let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'public'))
app.engine('.html',ejs.__express)
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
logger(app)
sessionStore(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(session({
// 	secret: 'keyboard music', // 相当于是一个加密密钥，值可以是任意字符串
// 	resave: false, // 强制session保存到session store中
// 	saveUninitialized: false // 强制没有“初始化”的session保存到storage中
// }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
indexSve(app) // 注册自定义路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err)
  //res.render('error')
})

module.exports = app
