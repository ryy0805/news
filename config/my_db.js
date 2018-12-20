// 1.导包
var mysql = require('mysql');
// 2.配置mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'news'
});
//  3.开启连接
connection.connect();



module.exports = connection;