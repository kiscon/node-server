const WebSocket = require('ws')
const escapeGoat = require('escape-goat')
const http = require('http')
const moment = require('moment')

// https://github.com/websockets/ws

let count = 0

const socket = (app) => {
  const baseServer = http.createServer(app)
  const wss = new WebSocket.Server({
    server: baseServer
  })
  // 为wss追加自定义方法，进行消息广播
  // 系统消息 type=2，用户消息 type=1
  // time 消息发送时间
  // count 当前在线人数
  // name 消息发送者
  // msg 发送的消息
  wss.broadcast = function broadcast(name, msg, type) {
    let _type = type || 1
    let msgInfo = {
      type: _type,
      name: name,
      msg: escapeGoat.escape(msg), // 防止XSS注入攻击
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      count: count
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msgInfo))
      }
    })
  }
  wss.on('connection', (ws, req) => {
    count++
    const ip = req.connection.remoteAddress
    ws.ip = ip
    wss.broadcast('系统消息','欢迎'+ ip +'进入聊天室',2)
    ws.on('message', (data) => {
      console.log(data)
      let msgInfo = JSON.parse(data)
      wss.broadcast(msgInfo.name, msgInfo.msg)
    })

    ws.on('close', ()=> {
      count--
      wss.broadcast('系统消息',ws.ip +'已经离开聊天室',2)
    })
  })
}

module.exports = socket
