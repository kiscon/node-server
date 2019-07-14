const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html') //这个地方填写dist/index.html的路径
})

module.exports = router
