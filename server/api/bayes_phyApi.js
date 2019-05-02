//连接数据库 执行相关用法
var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//获取贝叶斯药材表
router.post('/getPhy', (req, res) => {
  var sql = $sql.bayes.getPhy;
  var params = req.body;
  // console.log(params);
  // console.log(params.uid);
  // console.log(sql);
  conn.query(sql, [params.uid], function (err, result) {
    if (err) {
      throw err;
      console.log(err);
    }
    if (result) {
      res.json(result);
      // console.log(result);
    }
  })
});

router.post('/delPhy', (req, res) => {
  var sql = 'truncate table result';

  conn.query(sql, function (err, result) {
    if (err) {
      throw err;
      console.log(err);
    }
    if (result) {
      res.json(result);
      // console.log(result);
    }
  })
});
module.exports = router;
