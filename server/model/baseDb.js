const mysql = require('mysql')
const config = require('../../config/config')

let connection = mysql.createConnection({
	host: config.mysqpl.host,
	user: config.mysqpl.user,
	password: config.mysqpl.password,
	database: config.mysqpl.database,
	multipleStatements: true // 开启执行多条Sql语句的功能
});

module.exports = connection