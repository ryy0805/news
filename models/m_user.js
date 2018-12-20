// 专门处理用户的相关的数据库操作部分

const conn = require("../config/my_db");

// 查询数据库用于登录验证邮箱
exports.checkemail = (email,callback)=>{

  const sqlstr = 'select * from users where email=?';

  conn.query(sqlstr,email, (err, results) => {
          if(err) {
           return callback(err);
          }
            callback(null,results);
  });
}

// 查询数据库验证昵称
exports.checknickname = (nickname,callback) =>{
  const sqlstr = 'select * from users where nickname=?';
  conn.query(sqlstr,nickname,(err,data)=>{
    if(err) {
      return callback(err);
    }
    callback(null,data);
  })
}
// 查询数据库添加信息，完成用户注册功能
exports.addUser = (body,callback) =>{
  const sqlstr = "insert into users set ?";
  conn.query(sqlstr,body,(err,data)=>{
    if(err) {
        return callback(err);
    }
    callback(null,data);
  })
}
