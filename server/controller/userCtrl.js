const md5 = require('blueimp-md5');
const userModel = require('../model/user');
const tipConfig = require('../utils/tipConfig');
const utils = require('../utils/utils');
const config = require('../../config/config');

const userCtrl = {
	getAllUsers: (req, res) => {
		let params = req.body;
		userModel.getAllUsers((error, results) => {
			try {
				tipConfig.$log({title: '获取用户信息列表', error, results, params});
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
	addUser: (req, res) => {
		let form = req.body;
		if (!form.userCode) {
			res.send({ code: tipConfig.RES_Err, msg: '账号不能为空', data: null});
		}
		if (!form.password) {
			res.send({ code: tipConfig.RES_Err, msg: '密码不能为空', data: null});
		}
		// 用户注册参数
		let id = utils.guid();
		let params = {
			id: id,
			user_id: id,
			user_name: form.userName,
			user_code: form.userCode,
			mobile: form.mobile,
			password: md5(form.password, config.pwdSalt),
			regist_time: utils.formatDate({timestamp: Date.now()}),
			login_time: null,
			del_time: null
		}
		// 获取指定的用户信息
		userModel.getSelectUser(params,(error, results) => {
			// 如果发生错误，则直接返回结果
			if (error) {
				res.send({ code: tipConfig.RES_Err, msg: '用户注册失败，请稍后再试！', data: null});
				return;
			}
			// 判断用户是否存在
			if (results.length) {
				res.send({ code: tipConfig.RES_Err, msg: '账号已存在！', data: null});
				return;
			}
			// 用户账号不存在就新增
			userModel.addUserInfo(params, (error, result) => {
				try {
					tipConfig.$log({title: '新增用户', error, result, params});
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
		});
	},
	loginUser: (req, res) => {
		let form = req.body;
		let params = {
			user_code: form.userCode,
			password: md5(form.password, config.pwdSalt),
			login_time: utils.formatDate({timestamp: Date.now()})
		}
		// 获取用户信息
		userModel.getUserByUserCodeAndPwd(params, (error, results) => {
			// 如果发生错误，则直接返回结果
			if (error) {
				res.send({ code: tipConfig.RES_Err, msg: '登录失败，请稍后再试！', data: null});
				return;
			}
			// 判断用户是否存在
			if (!results.length) {
				res.send({ code: 14878, msg: tipConfig.userErr_Txt, data: null});
				return;
			}
			// 用户账号登录
			userModel.loginUser(params, (error, result) => {
				try {
					tipConfig.$log({title: '用户登录', error, result, params});
					if (!error) {
						// 记住用户名
						if (parseInt(form.rememberPassword) === 1) {
							res.cookie('mc_lu', form.userCode, { expires: new Date(Date.now() + 3600000 * 24 * 7), httpOnly: false });
							res.cookie('mc_lp', form.password, { expires: new Date(Date.now() + 3600000 * 24 * 7), httpOnly: false });
						} else if (parseInt(form.rememberPassword) === 0) { // 不记住密码
							res.cookie('mc_lu', '', { expires: new Date(Date.now()), httpOnly: false });
							res.cookie('mc_lp', '', { expires: new Date(Date.now()), httpOnly: false });
						}
						// 保存登录信息
						req.session.accountInfo = {
							userInfo: results[0],
							islogin: true,
							// token: userInfo.token,
						}
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
		});
	},
	logOut: (req, res) => {
		// req.session.accountInfo = null;
		// 通过destroy()方法清空session数据
		req.session.destroy(function(err){
			if(err) throw err;
			res.redirect('/login');
		});
	},
	cancellationUser: (req, res) => {
		let form = req.body;
		let params = {
			user_code: form.userCode,
			password: md5(form.password, config.pwdSalt),
			isdel: form.isdel,
			del_time: utils.formatDate({timestamp: Date.now()})
		}
		// 获取用户信息
		userModel.getUserByUserCodeAndPwd(params, (error, results) => {
			// 如果发生错误，则直接返回结果
			if (error) {
				res.send({ code: tipConfig.RES_Err, msg: '注销失败，请稍后再试！', data: null});
				return;
			}
			// 判断用户是否存在
			if (!results.length) {
				res.send({ code: 14878, msg: tipConfig.userErr_Txt, data: null});
				return;
			}
			// 用户账号注销
			// 数据软删除，通过给表添加isdel字段，来标识数据记录是否被删除，1表示被删除，0表示未删除
			// 数据软删除的好处：能最大限度地保留数据的原始性
			userModel.cancellationUser(params, (error, results) => {
				try {
					tipConfig.$log({title: '用户注销', error, results, params});
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
		});
	}
}

module.exports = userCtrl;
