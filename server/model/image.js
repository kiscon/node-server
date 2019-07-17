const { exec } = require('../db/mysql')
const user = {
	getAllImgs() {
		let sql = 'select * from image_info order by id asc'
		return exec(sql).then(rows => {
			return rows || []
		})
	},
	addImgInfo(params) {
		let sql = 'insert into image_info set ?'
		return exec(sql, params).then(rows => {
			return rows || []
		})
	}
}

module.exports = user