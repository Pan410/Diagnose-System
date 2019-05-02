//连接数据库 执行相关用法
var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 增加药材接口
router.post('/addPharmacy', (req, res) => {
  var sql = $sql.pharmacy.add;
  var params = req.body;
  var sel = $sql.pharmacy.sel;
  // console.log(params);
  // console.log(sql);
  conn.query(sel, [params.name], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length == 0) {
      conn.query(sql, [params.name, params.remark], function (err, result) {
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
    } else {
      res.json({
        resultCode: 100,
        msg: '药材已存在，切勿重复添加',
      })
    }
  })

});
//获取药材
router.get('/getPharmacy', (req, res) => {
  var sql = $sql.pharmacy.get;
  // console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      //   console.log(result);
      res.json(result);
    }
  })
});
//修改药材接口
router.post('/updatePha', (req, res) => {
  var sql = $sql.pharmacy.update;
  var params = req.body;
  // console.log(params);
  // console.log(sql);
  conn.query(sql, [params.name, params.remark, params.id], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
})
//删除药材
router.post('/delPha', (req, res) => {
  var sql = $sql.pharmacy.del;
  var params = req.body;
  // console.log(params);
  // console.log(sql);
  conn.query(sql, [params.id], function (err, result) {
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
