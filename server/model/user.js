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
		// let sql = 'select * from user_info where user_code=? and password=? and isdel=?'
		// let opts = [params.user_code, params.password, 0]
		let sql = `select * from user_info where user_code=${params.user_code} and password=${params.password} and isdel=0`
		return exec(sql).then(rows => {
			return rows || []
		})
	},
	loginUser(params) {
		let sql = `update user_info set login_time='${params.login_time}' where user_code=${params.user_code}`
		return exec(sql).then(row => {
			return row || {}
		})
	},
	cancellationUser(params) {
		// let sql = `update user_info set isdel=? , del_time=? where user_code=?`
		// let opts = [params.isdel, params.del_time, params.user_code]
		let sql = `update user_info set isdel=1 , del_time='${params.del_time}' where user_code=${params.user_code}`
		return exec(sql).then(row => {
			return row || {}
		})
	}
}

module.exports = user