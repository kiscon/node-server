const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('../../config/config')


function Product(id, title, price, rating, desc, categories) {
  this.id = id
  this.title = title
  this.price = price
  this.rating = rating
  this.desc = desc
  this.categories = categories
}

// 评论
function Comment(id, productId, timestamp, user, rating, content) {
  this.id = id
  this.productId = productId
  this.timestamp = timestamp
  this.user = user
  this.rating = rating
  this.content = content
}

let products = [
  new Product(1, "第一个商品", 1.99, 3.5, "这是我的第一个商品", ["电子设备", "数码"]),
  new Product(2, "第二个商品", 2.99, 2.5, "这是我的第二个商品", ["图书", "数码"]),
  new Product(3, "第三个商品", 3.99, 1.5, "这是我的第三个商品", ["电子设备", "数码"]),
  new Product(4, "第四个商品", 4.99, 4.5, "这是我的第四个商品", ["电子设备", "图书"]),
  new Product(5, "第五个商品", 5.99, 3.5, "这是我的第五个商品", ["电子设备", "数码"]),
  new Product(6, "第六个商品", 6.99, 3.5, "这是我的第六个商品", ["电子设备", "数码"])
]

let comments = [
  new Comment(1, 1, "2017-11-26 21:56:50", "张三", 3, "很好"),
  new Comment(2, 1, "2017-11-26 22:56:50", "李四", 3, "很好"),
  new Comment(3, 1, "2017-11-26 23:56:50", "王五", 3, "很好"),
  new Comment(4, 2, "2017-11-26 00:56:50", "赵六", 3, "很好"),
]


router.get('/getProducts', function (req, res) {
  let results = products
  console.log('******获取商品列表******start')
  console.log(JSON.stringify(results))
  console.log('******获取商品列表******end')
  res.json(results)
})

//商品信息
router.get('/products', function (req, res) {
  let result = products, params = req.query
  console.log("商品搜索-----请求参数-----satrt")
  console.log(params)
  console.log("商品搜索-----请求参数-----end")
  if (params.title) {
    result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1 })
  }
  if (params.price && result.length > 0) {
    result = result.filter(function (p) { return p.price <= parseInt(params.price) })
  }
  if (params.category != "-1" && result.length > 0) {
    result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1 })
  }
  res.json(result)
})

//商品详情
router.get('/product/:id', function (req, res) {
  let results = products.find(function (product) {
    return product.id == req.params.id
  })
  console.log('******获取商品详情******start')
  console.log(JSON.stringify(results))
  console.log('******获取商品详情******end')
  res.json(results)
})

//商品评论
router.get('/product/:id/comments', function (req, res) {
  let results = comments.filter(function (comment) {
    return comment.productId == req.params.id
  })
  console.log('******获取商品评论数据******start')
  console.log(JSON.stringify(results))
  console.log('******获取商品评论数据******end')

  res.json(results)
})





module.exports = router
