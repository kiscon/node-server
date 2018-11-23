const mysql = require('mysql');

let connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'music',
	multipleStatements: true // 开启执行多条Sql语句的功能
});

module.exports = connection;