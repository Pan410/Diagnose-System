var conn = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//创建医案
router.post('/addHome', (req, res) => {
  var sql = $sql.Home.add;
  var params = req.body;
  // console.log(params);
  // console.log(sql);
  conn.query(sql, [params.id, params.sym, params.diag], function (err, result) {
    if (err) {
      throw err;
      console.log(err);
    }
    if (result) {
      res.json(result);
    }
  })
});
module.exports = router;
