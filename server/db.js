// 数据库连接配置
var mysql = require("mysql");
// module.exports = {
var mydb = {
  host: "10.4.6.222", // 新建数据库连接时的 主机名或ID地址 内容
  user: "root",
  password: "123456", // root 密码
  database: "myblog", // 数据库名
  port: "3306",
  multipleStatements: true //允许多条sql同时执行
};
// };
var conn = mysql.createConnection(mydb);
conn.connect();
module.exports = conn;
