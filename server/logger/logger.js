const FileStreamRotator = require('file-stream-rotator') // 日志切割
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
// dev 格式
/*
* GET / 304 2.887 ms - -
* GET /file 200 888.191 ms - 1807
* */

const logger = (app) => {
	let logDirectory = path.join(__dirname, 'logFile')
	// ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
	// create a rotating write stream
	const accessLogStream = FileStreamRotator.getStream({
		date_format: 'YYYYMMDD',
		filename: path.join(logDirectory, 'access-%DATE%.log'),
		frequency: 'daily',
		verbose: false
	})
	app.use(morgan('dev', {
		stream: accessLogStream
	}))
}

module.exports = logger