//连接数据库 执行相关用法
var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');


//增加创作接口
router.post('/addCreation', (req, res) => {
  var sql = $sql.record.add;
  var params = req.body;
  // console.log(params);
  conn.query(sql, [params.title, params.auther, params.date, params.content, params.look], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json({
        resultCode: 200,
        msg: "添加成功",
      })
    }
  })
})

//获取所有人可浏览创作列表
router.get('/everCreation', (req, res) => {
  var sql = $sql.record.getevery;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })
})
//获取本人创作
router.post('/myCreation', (req, res) => {
  var sql = $sql.record.getmy;
  var params = req.body;
  // console.log(params);
  conn.query(sql, [params.auther], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })
})
module.exports = router;
