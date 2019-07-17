const express = require('express')
const image =  require('../controller/image')
const loinCheck =  require('../middleware/loginCheck')
const router = express.Router()

router
	.post('/addImgInfo',loinCheck, image.addImgInfo) // 新增图片
	.post('/uploadPic', image.uploadPic) // 上传图片
	.post('/getAllImgs', image.getAllImgs) // 获取图片信息列表

module.exports = router