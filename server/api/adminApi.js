// 执行相关用法
// var models = require('../db');
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");
const jwt = require('jsonwebtoken');
var conn = require('../db');
const secretkey = 'secretkey';

//获取管理员状态
router.post('/getAdminer', (req, res) => {
  var sql = $sql.admin.gets;
  var params = req.body;
  conn.query(sql, [params.name, params.passwd], function (err, result) {
    if (err) {
      throw err;
    }
    if (JSON.stringify(result) != '[]') {
      var token = jwt.sign({
        name: params.name
      }, secretkey, {
        expiresIn: 60 * 60 * 24 //到期时间
      });
      var adminRole = JSON.parse(JSON.stringify(result))[0].role;

      res.json({
        resultCode: 200,
        message: '登录成功',
        role: adminRole,
        token: token,
        info: result,
      })

    } else {
      res.json({
        resultCode: 401,
        message: '账号或密码有误',
        info: result
      })
    }
  })
})



// 增加管理接口
router.post('/addAdmin', (req, res) => {
  var sql = $sql.admin.add;
  var params = req.body;
  // console.log(params);
  conn.query(sql, [params.date, params.name, params.passwd, params.role], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })
});
// 查询管理接口
router.get('/getAdmin', (req, res) => {
  var sql = $sql.admin.get;
  // console.log(sql);
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
});
//查询管理接口
// router.get('/getAdmin', (req, res) => {
//   var listStr = `select * from admin`;
//   conn.query(listStr, function (err, result) {
//     if (err) throw err;
//     res.json({
//       message: '登录成功',
//       resultCode: 200,
//       info: result
//     })
//   })
// })



//删除管理接口
router.post('/delAdmin', (req, res) => {
  var params = req.body;
  var sql = $sql.admin.del;
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
// 修改管理信息接口
router.post('/updateAdmin', (req, res) => {
  var params = req.body;
  var sql = $sql.admin.update;
  // console.log(params);
  // console.log(sql);
  conn.query(sql, [params.name, params.passwd, params.role, params.id], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })

})

module.exports = router;
