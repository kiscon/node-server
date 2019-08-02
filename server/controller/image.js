const	fs = require('fs')
const moment = require('moment')
const formidable = require('formidable')
const imageModel = require('../model/image')
const tipConfig = require('../utils/tipConfig')
const config = require('../config/config')
const utils = require('../utils/utils')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const imageCtrl = {
	getAllImgs: (req, res) => {
		let params = req.body
		let results = imageModel.getAllImgs()
		results.then(data => {
			tipConfig.$log({title: '获取图片信息列表', result: data, params})
			res.json(new SuccessModel(data))
		})
	},
	addImgInfo: (req, res) => {
		let form = req.body
		let userInfo = getUserInfo(req)
		let params = {
			id: utils.guid(),
			// mobile: form.mobile,
			// password: form.password,
			userId: userInfo.user_id,
			create_time: Date.now()
		}
		let result = imageModel.addImgInfo(params)
		result.then(dat => {
			tipInfo.$log({title: '新增图片', result: dat, params})
			res.json(new SuccessModel(tipInfo.ok_Txt))
		})
	},
	uploadPic: (req, res) => {
		res.header("Access-Control-Allow-Origin", "*")
		let form = new formidable.IncomingForm() //创建上传表单
		form.encoding = 'utf-8' //设置编辑
		//产生上传目录
		let fileUploadDir = moment().format('YYYYMMDD')
		let uploadPath = `${config.uploadImg.local_base_url}${fileUploadDir}` // 本地路径
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath)
		}
		let randDir = Math.random() * 100000000000000000
		uploadPath = `${uploadPath}/${randDir}`
		fs.mkdirSync(uploadPath)

		form.uploadDir = uploadPath // 设置上传目录
		form.keepExtensions = true // 保留后缀
		form.maxFieldsSize = 400 * 1024 * 1024 // 文件大小

		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.json(new ErrorModel('上传失败'))
			}
			let loaclUrl = files.file.path
			console.log(loaclUrl)
		})
	}
}

module.exports = imageCtrl