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

// //  4.执行增删改查语句
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// //  5.关闭链接
// connection.end();