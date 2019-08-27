const userModel = require('../model/user')
const tipInfo = require('../utils/tipConfig')
const utils = require('../utils/utils')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { genPassword } = require('../utils/cryp')
const { escape } = require('../db/mysql')

const userCtrl = {
	getAllUsers: async (ctx, next) => {
		let params = ctx.request.body
		const result = 	await userModel.getAllUsers(params)
		tipInfo.$log({title: '获取用户信息列表', result, params})
		ctx.body = new SuccessModel(result)
	},
	addUser: async (ctx, next) => {
		let form = ctx.request.body
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
		let data = await userModel.getSelectUser(params)
		if (data.length) {
			ctx.body = new ErrorModel('账号已存在！')
			return
		}
		try {
			let result = await userModel.addUserInfo(params)
			tipInfo.$log({title: '新增用户', result, params})
			ctx.body = new SuccessModel(tipInfo.ok_Txt)
		} catch (err) {
			console.log(err)
			ctx.body = new ErrorModel('用户注册失败，请稍后再试！')			
		}
	},
	loginUser: async (ctx, next) => {
		let form = ctx.request.body
		let params = {
			user_code: escape(form.userCode),
			password: escape(genPassword(form.password)),
			rememberPassword: form.rememberPassword || 0,
			login_time: utils.time(Date.now())
		}
		// 获取用户信息
		let data = await userModel.getUserByUserCodeAndPwd(params)
		if (!data.length) {
			ctx.body = { code: 14878, msg: tipInfo.userErr_Txt, data: null}
			return
		}
		let userInfo = data[0]
		// 用户账号登录
		let dat = await userModel.loginUser(params)
		tipInfo.$log({title: '用户登录', result: dat, params})
		// 记住用户名
		if (parseInt(form.rememberPassword) === 1) {
			ctx.cookies.set('mc_lu', form.userCode, { expires: new Date(Date.now() + 3600000 * 24 * 7), httpOnly: true })
			ctx.cookies.set('mc_lp', form.password, { expires: new Date(Date.now() + 3600000 * 24 * 7), httpOnly: true })
		} else if (parseInt(form.rememberPassword) === 0) { // 不记住密码
			ctx.cookies.set('mc_lu', '', { expires: new Date(Date.now()), httpOnly: true })
			ctx.cookies.set('mc_lp', '', { expires: new Date(Date.now()), httpOnly: true })
		}
		// 保存登录信息
		ctx.session.accountInfo = {
			userInfo,
			islogin: true,
			// token: userInfo.token,
		}
		ctx.body = new SuccessModel(userInfo)
	},
	logOut: async (ctx, next) => {
		if (!ctx.session) return
		ctx.session = null
		ctx.body = new SuccessModel(tipInfo.ok_Txt)
	},
	cancellationUser: async (ctx, next) => {
		let form = ctx.request.body
		let params = {
			user_code: escape(form.userCode),
			password: escape(genPassword(form.password)),
			isdel: 1,
			del_time: utils.time(Date.now())
		}
		let data = await userModel.getUserByUserCodeAndPwd(params)
		console.log(data)
		// 判断用户是否存在
		if (!data.length) {
			ctx.body = {code: 14878, msg: tipInfo.userErr_Txt, data: null}
			return
		}
		// 用户账号注销
		// 数据软删除，通过给表添加isdel字段，来标识数据记录是否被删除，1表示被删除，0表示未删除
		// 数据软删除的好处：能最大限度地保留数据的原始性
		let result = await userModel.cancellationUser(params)
		tipInfo.$log({title: '用户注销', result, params})
		ctx.body = new SuccessModel(tipInfo.ok_Txt)
	}
}

module.exports = userCtrl
