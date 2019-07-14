const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

let connection = mysql.createConnection({
	...MYSQL_CONF,
	multipleStatements: true // 开启执行多条Sql语句的功能
})

connection.connect()

const exec = (sql, params) => {
	return new Promise((resolve, reject) => {
		connection.query(sql, params, (err, result) => {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
		})
	})
}

module.exports = {
	exec,
	escape: mysql.escape
}