//后端入口文件 启动后端服务
const adminApi = require('./api/adminApi');
const symptomApi = require('./api/symptomApi');
const pharmacyApi = require('./api/pharmacyApi');
const consiliaApi = require('./api/consiliaApi');
const recordApi = require('./api/recordApi');
const sickApi = require('./api/sickApi');
const bayes_phyApi = require('./api/bayes_phyApi');
const bayes_symApi = require('./api/bayes_symApi');
const home = require('./api/home');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken'); //生成token
const connection = require('./db');
const secretkey = 'secretkey';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// 后端api路由
// app.use(router);
app.use('/api/admin', adminApi);
app.use('/api/symptom', symptomApi);
app.use('/api/pharmacy', pharmacyApi);
app.use('/api/consilia', consiliaApi);
app.use('/api/recordApi', recordApi);
app.use('/api/sick', sickApi);
app.use('/api/bayesSym', bayes_symApi);
app.use('/api/bayesPhy', bayes_phyApi);
app.use('/api/home', home);



// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });



app.use(function (req, res, next) {
  // console.log(req.headers);
  if (req.url != '/admin') {
    //token可能存在post请求和get请求
    let token = req.body.token || req.query.token || req.headers.token;

    jwt.verify(token, secretkey, function (err, decode) {
      if (err) {
        res.json({
          message: 'token过期，请重新登录',
          resultCode: '403'
        })
      } else {
        next();
      }
    })
  } else {
    next();
  }
})


// 监听端口
app.use('/public', express.static('public'))
//静态文件路径
app.use(express.static(path.join(__dirname, 'dist')))
app.listen(3000);
console.log('数据库连接成功');
