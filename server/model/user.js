const baseDb = require('./baseDb.js');
const user = {
	getAllUsers(cb) {
		let sqlStr = 'select * from user_info order by id asc';
		baseDb.query(sqlStr, (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},
	getSelectUser(params, cb) {
		let sqlStr = 'select * from user_info where user_code=? and isdel=0';
		baseDb.query(sqlStr, [params.user_code], (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},
	addUserInfo(params, cb) {
		let sqlStr = 'insert into user_info set ?';
		baseDb.query(sqlStr, params, (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},
	getUserByUserCodeAndPwd(params, cb) {
		let sqlStr = 'select * from user_info where user_code=? and password=? and isdel=?';
		baseDb.query(sqlStr, [params.user_code, params.password, 0], (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},
	loginUser(params, cb) {
		let sqlStr = 'update user_info set login_time=? where user_code=?';
		baseDb.query(sqlStr, [params.login_time, params.user_code], (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},
	cancellationUser(params, cb) {
		let sqlStr = `update user_info set isdel=? , del_time=? where user_code=?`;
		baseDb.query(sqlStr, [params.isdel, params.del_time, params.user_code], (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},
}

module.exports = user;