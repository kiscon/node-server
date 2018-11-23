const express = require('express');
const router = express.Router();
const request = require('request');
const superagent = require('superagent');
const config = require('../../config/config');

router.post('/getMovieList', function (req, res) {
  let form = req.body,
    url = `${config.request_url.base_api_url}/movie/${form.type}`,
    params = {
      start: form.page,
      count: form.count
    };
  superagent
    .get(url)
    .query(params)
    .end(function(err, response) {

      console.log('获取电影列表-URL：', url);
      console.log('获取电影列表-参数：', params);
      console.log('获取电影列表-错误：', err);
      console.log('获取电影列表-结果：', response.text);

      if (!err) {
        res.send({status: 200, data: response.text, msg: ''});
      } else{
        res.send({status: 500, data: null, msg: '服务异常，请稍后重试！'});
      }
    });
});



module.exports = router
