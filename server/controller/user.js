const userModel = require('../model/user')
const tipInfo = require('../utils/tipConfig')
const utils = require('../utils/utils')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { genPassword } = require('../utils/cryp')
const { escape } = require('../db/mysql')

const userCtrl = {
	getAllUsers: (req, res) => {
		let params = req.body
		const result = 	userModel.getAllUsers(params)
		return result.then(data => {
			tipInfo.$log({title: '获取用户信息列表', result: data, params})
			res.json(new SuccessModel(data))
		})
	},
	addUser: (req, res) => {
		let form = req.body
		if (!form.userCode) {
			res.json(new ErrorModel('账号不能为空'))
		}
		if (!form.password) {
			res.json(new ErrorModel('密码不能为空'))
		}
		// 用户注册参数
		let id = utils.guid()
		let params = {
			id: id,
			user_id: id,
			user_name: form.userName,
			user_code: form.userCode,
			mobile: form.mobile,
			password: genPassword(form.password),
			regist_time: utils.time(Date.now()),
			login_time: null,
			del_time: null
		}
		// 获取指定的用户信息
		let results = userModel.getSelectUser(params)
		results.then(data => {
			// 判断用户是否存在
			if (data.length) {
				res.json(new ErrorModel('账号已存在！'))
				return
			}
			let result = userModel.addUserInfo(params)
			result.then(dat => {
				tipInfo.$log({title: '新增用户', result: dat, params})
				res.json(new SuccessModel(tipInfo.ok_Txt))
			})
		}).catch(() => {
			res.json(new ErrorModel('用户注册失败，请稍后再试！'))
		})
	},
	loginUser: (req, res) => {
		let form = req.body
		let params = {
			user_code: escape(form.userCode),
			password: escape(genPassword(form.password)),
			rememberPassword: form.rememberPassword || 0,
			login_time: utils.time(Date.now())
		}
		// 获取用户信息
		let results = userModel.getUserByUserCodeAndPwd(params)
		results.then(data => {
			// 判断用户是否存在
			if (!data.length) {
				res.json({ code: 14878, msg: tipInfo.userErr_Txt, data: null})
				return
			}
			let userInfo = data[0]

			// 用户账号登录
			let result = userModel.loginUser(params)
			result.then(dat => {
				console.log(dat)
				tipInfo.$log({title: '用户登录', result: dat, params})
				// 记住用户名
				if (parseInt(form.rememberPassword) === 1) {
					res.cookie('mc_lu', form.userCode, { expires: new Date(Date.now() + 3600000 * 24 * 7), httpOnly: true })
					res.cookie('mc_lp', form.password, { expires: new Date(Date.now() + 3600000 * 24 * 7), httpOnly: true })
				} else if (parseInt(form.rememberPassword) === 0) { // 不记住密码
					res.cookie('mc_lu', '', { expires: new Date(Date.now()), httpOnly: true })
					res.cookie('mc_lp', '', { expires: new Date(Date.now()), httpOnly: true })
				}
				// 保存登录信息
				req.session.accountInfo = {
					userInfo,
					islogin: true,
					// token: userInfo.token,
				}
				res.json(new SuccessModel(userInfo))
			})
		})
	},
	logOut: (req, res) => {
		// 通过destroy()方法清空session数据
		if (!req.session) return
		req.session.destroy(err => {
			if(err) throw err
			res.json(new SuccessModel(tipInfo.ok_Txt))
		})
	},
	cancellationUser: (req, res) => {
		let form = req.body
		let params = {
			user_code: escape(form.userCode),
			password: escape(genPassword(form.password)),
			isdel: 1,
			del_time: utils.time(Date.now())
		}
		// 获取用户信息
		let results = userModel.getUserByUserCodeAndPwd(params)
		results.then(data => {
			console.log(data)
			// 判断用户是否存在
			if (!data.length) {
				res.json({ code: 14878, msg: tipInfo.userErr_Txt, data: null})
				return
			}
			// 用户账号注销
			// 数据软删除，通过给表添加isdel字段，来标识数据记录是否被删除，1表示被删除，0表示未删除
			// 数据软删除的好处：能最大限度地保留数据的原始性
			let result = userModel.cancellationUser(params)
			result.then(dat => {
				tipInfo.$log({title: '用户注销', result: dat, params})
				res.json(new SuccessModel(tipInfo.ok_Txt))
			})
		})
	}
}

module.exports = userCtrl
