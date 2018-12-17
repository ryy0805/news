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

// const conn = require('./db/my_db');
// 渲染登录页面
exports.showSignin  = (req,res) => {
   
  res.render("signin.html");
  
};

// 获取登录页面表单内容,处理登录请求
exports.handleSignin = (req,res) => {
   const body = req.body;
   console.log(body);
  
  const sqlstr = 'select * from users where email=?';
  connection.query(sqlstr,body.email, function (error, results) {
  if (error) throw error;
  console.log(results);
  // 验证邮箱
  if(results.length === 0) {
    res.send({
      code:1,
      msg:"邮箱不存在"
    })
  }
  // console.log(results);
  // 验证密码
  if(results[0].password !== body.password) {
    return res.send({
    code:2,
    msg:"密码错误！"
    })
  }
  // 密码正确，返回200
    res.send({
      code:200,
      msg:"登录成功"
     })
  
});
  
  
  
}