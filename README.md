### 功能要点

1. 使用mvc中mc层结构，m层主要操作数据库，c层主要写业务逻辑

2. 使用morgan、file-stream-rotator完成日志的存储及切割操作
```javascript
const logger = app => {
	const ENV = process.env.NODE_ENV
	if (ENV !== 'prod') {
		app.use(logger('dev'))
	} else {
		const logDirectory = path.join(__dirname, '..',  'logs')
		fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
		const accessLogStream = FileStreamRotator.getStream({
			date_format: 'YYYYMMDD',
			filename: path.join(logDirectory, 'access-%DATE%.log'),
			frequency: 'daily',
			verbose: false
		})
		app.use(morgan('combined', {
			stream: accessLogStream
		}))
	} 
}
```

3. 使用mysql存储数据，使用express-session和redis完成对用户登录信息的存储
```javascript
const redisClient = redis.createClient(
	REDISL_CONF.port,
	REDISL_CONF.host,
	RDS_OPTS
)
let connection = mysql.createConnection({
	...MYSQL_CONF,
	multipleStatements: true // 开启执行多条Sql语句的功能
})
connection.connect()
```

4. 使用crypto对密码进行md5加密存储
```javascript
const md5 = content => {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
```

5. 使用ws和escape-goat完成聊天室