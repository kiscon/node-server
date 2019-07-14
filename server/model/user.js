const { exec } = require('../db/mysql')

const user = {
	getAllUsers() {
		let sql = 'select * from user_info where isdel=0 order by id asc'
		return exec(sql).then(rows => {
			return rows || []
		})
	},
	getSelectUser(params) {
		let sql = 'select * from user_info where user_code=? and isdel=0'
		let opts = [params.user_code]
		return exec(sql, opts).then(rows => {
			return rows || []
		})
	},
	addUserInfo(params) {
		let sql = 'insert into user_info set ?'
		let opts = params
		return exec(sql, opts).then(rows => {
			return rows || []
		})
	},
	getUserByUserCodeAndPwd(params) {
		let sql = 'select * from user_info where user_code=? and password=? and isdel=?'
		let opts = [params.user_code, params.password, 0]
		return exec(sql, opts).then(rows => {
			return rows || []
		})
	},
	loginUser(params) {
		let sql = 'update user_info set login_time=? where user_code=?'
		let opts = [params.login_time, params.user_code]
		return exec(sql, opts).then(row => {
			return row || {}
		})
	},
	cancellationUser(params) {
		let sql = `update user_info set isdel=? , del_time=? where user_code=?`
		let opts = [params.isdel, params.del_time, params.user_code]
		return exec(sql, opts).then(row => {
			return row || {}
		})
		// let sqlStr = `update user_info set isdel=? , del_time=? where user_code=?`
		// baseDb.query(sqlStr, [params.isdel, params.del_time, params.user_code], (err, results) => {
		// 	if (err) return cb(err)
		// 	cb(null, results)
		// })
	}
}

module.exports = user