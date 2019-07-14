const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

// dev 格式
/*
* GET / 304 2.887 ms - -
* GET /file 200 888.191 ms - 1807
* */
// const ENV = process.env.NODE_ENV
// if (ENV !== 'prod') {
//   app.use(logger('dev'))
// } else {
//   const logFileName = path.join(__dirname, 'logs', 'access.log')
//   const writeStream = fs.createWriteStream(logFileName, {
//     flags: 'a'
//   })
//   app.use(logger('combined', {
//     stream: writeStream
//   }))
// }

const logger = app => {
	const ENV = process.env.NODE_ENV
	if (ENV !== 'prod') {
		app.use(logger('dev'))
	} else {
		const logDirectory = path.join(__dirname, '..',  'logs')
		// ensure log directory exists
		fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
		// create a rotating write stream
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

module.exports = logger