//连接数据库 执行相关用法
var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//创建贝叶斯症状表
router.post('/addSym', (req, res) => {
  var sql = $sql.bayes.addsym;
  var params = req.body;
  // console.log(params.uid);
  // console.log(params.sid);
  // console.log(sql);
  conn.query(sql, [params.uid, params.sid], function (err, result) {
    if (err) {
      throw err;
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })
  // console.log(sql);
  // conn.query(sql, [params.bys], function (err, rows, fields) {
  //   if (err) {
  //     throw err;
  //     console.log(err);
  //   }
  //   if (rows) {
  //     res.json(rows);
  //   }
  // });
});
module.exports = router;
