const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建readline对象
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
rl.on('line', lineData => {
  if (!lineData) return
  sum++
  const arr = lineData.split('--')
  let item = arr[2]
  if (item && item.indexOf('Chrome') != -1) {
    chromeNum++
  }
})
rl.on('close', () => {
  console.log(`chrome 占比：${chromeNum / sum}`)
})
