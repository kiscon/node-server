const { exec } = require('../db/mysql')

const user = {
	async getAllUsers() {
		let sql = 'select * from user_info where isdel=0 order by id asc'
		let rows = await exec(sql)
		return rows || []
	},
	async getSelectUser(params) {
		let sql = 'select * from user_info where user_code=? and isdel=0'
		let opts = [params.user_code]
		let rows = await exec(sql, opts)
		return rows || []
	},
	async addUserInfo(params) {
		let sql = 'insert into user_info set ?'
		let opts = params
		let rows = await exec(sql, opts)
		return rows || []
	},
	async getUserByUserCodeAndPwd(params) {
		let sql = `select * from user_info where user_code=${params.user_code} and password=${params.password} and isdel=0`
		let rows = await exec(sql)
		return rows || []
	},
	async loginUser(params) {
		let sql = `update user_info set login_time='${params.login_time}' where user_code=${params.user_code}`
		let row = await exec(sql)
		return row || {}
	},
	async cancellationUser(params) {
		let sql = `update user_info set isdel=1 , del_time='${params.del_time}' where user_code=${params.user_code}`
		let row = await exec(sql)
		return row || {}
	}
}

module.exports = user