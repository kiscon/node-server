const express = require('express')
const imageCtrl =  require('../controller/imageCtrl')
const router = express.Router()

router
	.post('/addImgInfo', imageCtrl.addImgInfo) // 新增图片
	.post('/uploadPic', imageCtrl.uploadPic) // 上传图片
	.post('/getAllImgs', imageCtrl.getAllImgs) // 获取图片信息列表

module.exports = router