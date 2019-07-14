const baseDb = require('./baseDb.js')
const { exec, escape } = require('../db/mysql')

const user = {
	getAllUsers() {
		let sql = 'select * from user_info order by id asc'
		return exec(sql).then(rows => {
			return rows || []
		})
	},
	getSelectUser(params, cb) {
		let sqlStr = 'select * from user_info where user_code=? and isdel=0'
		baseDb.query(sqlStr, [params.user_code], (err, results) => {
			if (err) return cb(err)
			cb(null, results)
		})
	},
	addUserInfo(params, cb) {
		let sqlStr = 'insert into user_info set ?'
		baseDb.query(sqlStr, params, (err, results) => {
			if (err) return cb(err)
			cb(null, results)
		})
	},
	getUserByUserCodeAndPwd(params) {
		let sql = 'select * from user_info where user_code=? and password=? and isdel=?'
		let opts = [params.user_code, params.password, 0]
		return exec(sql, opts).then(rows => {
			return rows || []
		})
		// let sqlStr = 'select * from user_info where user_code=? and password=? and isdel=?'
		// baseDb.query(sqlStr, [params.user_code, params.password, 0], (err, results) => {
		// 	if (err) return cb(err)
		// 	cb(null, results)
		// })
	},
	loginUser(params) {
		let sql = 'update user_info set login_time=? where user_code=?'
		let opts = [params.login_time, params.user_code]
		return exec(sql, opts).then(row => {
			return row || {}
		})
		// baseDb.query(sqlStr, [params.login_time, params.user_code], (err, results) => {
		// 	if (err) return cb(err)
		// 	cb(null, results)
		// })
	},
	cancellationUser(params, cb) {
		let sqlStr = `update user_info set isdel=? , del_time=? where user_code=?`
		baseDb.query(sqlStr, [params.isdel, params.del_time, params.user_code], (err, results) => {
			if (err) return cb(err)
			cb(null, results)
		})
	},
}

module.exports = user