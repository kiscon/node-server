// const formidable = require('formidable');
// const	moment = require('moment');
const	fs = require('fs');
const imageModel = require('../model/image');
const tipConfig = require('../utils/tipConfig');
const utils = require('../utils/utils');

const imageCtrl = {
	getAllImgs: (req, res) => {
		let params = req.body;
		imageModel.getAllImgs((error, results) => {
			try {
				tipConfig.$log({title: '获取图片信息列表', error, results, params});
				if (!error) {
					res.send({
						code: tipConfig.RES_OK,
						msg: tipConfig.ok_Txt,
						data: results
					});
				} else {
					res.send({
						code: tipConfig.RES_Err,
						msg: tipConfig.err_Txt,
						data: null
					});
				}
			} catch(e) {
				console.log('代码执行出错：',e);
			}
		});
	},
	addImgInfo: (req, res) => {
		let form = req.body;
		// 用户注册参数
		let params = {
			id: utils.guid(),
			// mobile: form.mobile,
			// password: form.password,
			create_time: utils.formatDate({timestamp: Date.now()})
		}
		imageModel.addImgInfo(params, (error, results) => {
			try {
				tipConfig.$log({title: '新增图片', error, results, params});
				if (!error) {
					res.send({
						code: tipConfig.RES_OK,
						msg: tipConfig.ok_Txt,
						data: null
					});
				} else {
					res.send({
						code: tipConfig.RES_Err,
						msg: error.sqlMessage ? tipConfig.paramsErr_Txt : tipConfig.err_Txt,
						data: null
					});
				}
			} catch(e) {
				console.log('代码执行出错：',e);
			}
		});

	},
	uploadPic: (req, res) => {
		let form = new formidable.IncomingForm(); //创建上传表单
		form.encoding = 'utf-8'; //设置编辑
		//产生上传目录
		/*	let fileUploadDir = moment().format("YYYYMMDD"),
				uploadPath = config.oss.local_base_url + fileUploadDir; // 本地路径
			if (!fs.existsSync(uploadPath)) {
				fs.mkdirSync(uploadPath);
			}
			let randDir = Math.random() * 100000000000000000;
			uploadPath = uploadPath + '/' + randDir;
			fs.mkdirSync(uploadPath);

			form.uploadDir = uploadPath; //设置上传目录
			form.keepExtensions = true; //保留后缀
			form.maxFieldsSize = 400 * 1024 * 1024; //文件大小

			form.parse(req, function (err, fields, files) {
				let loaclUrl = files.file.path;
			});*/
	}
}

module.exports = imageCtrl;