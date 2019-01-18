const baseDb = require('./baseDb.js')
const user = {
	getAllImgs(cb) {
		let sqlStr = 'select * from image_info order by id asc'
		baseDb.query(sqlStr, (err, results) => {
			if (err) return cb(err)
			cb(null, results)
		})
	},
	addImgInfo(params, cb) {
		let sqlStr = 'insert into image_info set ?'
		baseDb.query(sqlStr, params, (err, results) => {
			if (err) return cb(err)
			cb(null, results)
		})
	}
}

module.exports = user