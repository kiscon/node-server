const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const indexSve = require('./routes/indexSve')
const logger = require('./middleware/logger')
const sessionStore = require('./middleware/sessionStore')
const socket = require('./model/socket')
const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')
// 之前版本
// app.set('views', path.join(__dirname, 'public'))
// app.engine('.html',ejs.__express)
// app.set('view engine', 'html')


logger(app)
sessionStore(app)
socket(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
indexSve(app) // 注册自定义路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
