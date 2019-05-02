//连接数据库 执行相关用法
var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//创建医案
router.post('/addsConsilia', (req, res) => {
  var sql = $sql.consilia.add;
  var params = req.body;
  // console.log(params);
  // console.log(sql);
  conn.query(sql, [params.uid, params.sym, params.diag, params.date, params.name], function (err, result) {
    if (err) {
      throw err;
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })
});
//查询医案
router.get('/getConsilia', (req, res) => {
  var sql = $sql.consilia.get;
  // console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  });
  //修改医案信息
  router.post('/updateConsilia', (req, res) => {
    var sql = $sql.consilia.update;
    var params = req.body;
    // console.log(params);
    // console.log(sql);
    conn.query(sql, [params.name, params.date, params.sym, params.diag, params.pres, params.remark, params.id], function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        // console.log(result);
        res.json(result);
      }
    })
  });
  //删除医案
  router.post('/delConsilia', (req, res) => {
    var params = req.body;
    var sql = $sql.consilia.del;
    // console.log(sql);
    // console.log(params);
    conn.query(sql, [params.id], function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        res.json(result);
      }
    })
  })
})
module.exports = router;
