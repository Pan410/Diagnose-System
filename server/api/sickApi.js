//连接数据库 执行相关用法
var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var $mysql = require('./configure/mySql');
var $value = require('./configure/value');


// 增加患者信息接口
router.post('/addSick', (req, res) => {
  var sql = $sql.sick.add;
  var params = req.body;
  // console.log(params);
  // console.log(sql);

  conn.query(sql, [params.id, params.name, params.sex, params.age, params.date, params.card, params.iphone, params.history, params.place], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json({
        resultCode: 200,
        msg: '添加成功',
      });
    }
  })
});

//获取全部患者信息
router.get('/getSick', (req, res) => {
  var sql = $sql.sick.get;
  // console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
})
//搜索老用户
router.post('/getUserSick', (req, res) => {
  var params = req.body;
  var num = params.num;

  var sql = $mysql.sick[num];
  var value = $value.sick[num];
  // console.log(num);
  // console.log(sql);
  var ss = eval(value.toString());
  // console.log(ss);
  conn.query(sql, ss, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
})


module.exports = router;
