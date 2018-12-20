

const M_user = require("../models/m_user");

// 渲染登录页面
exports.showSignin = (req, res) => {

  res.render("signin.html");

};

// 获取登录页面表单内容,处理登录请求
exports.handleSignin = (req, res) => {
  const body = req.body;
  // console.log(body);

  // 调用m_user
  M_user.checkemail(body.email, (err, data) => {
    if (err) throw err;
    console.log(data);
    // 验证邮箱
    if (data.length === 0) {
      return res.send({
        code: 1,
        msg: "邮箱不存在"
      })
    }
    // console.log(results);
    // 验证密码
    if (data[0].password !== body.password) {
      return res.send({
        code: 2,
        msg: "密码错误！"
      })
    }
    // 获取正确用户数据 使用session保存
    req.session.user = data[0];
    // console.log(req.session.user);

    
    // 密码正确，返回200状态吗
    res.send({
      code: 200,
      msg: "登录成功"
    })
  })  
  
}

// 处理用户退出请求操作
exports.handleSignout = (req,res) => {
  // 清除session用户信息
  delete req.session.user;
  // 重定向
  res.redirect("/signin");
}

// 渲染注册页面
exports.showSignup =(req,res) => {
  res.render("signup.html");
}

// 处理用户注册信息请求
exports.handleSignup =(req,res) => {
  const body = req.body;
  // console.log(body);
  // 1.先验证邮箱
  M_user.checkemail(body.email,(err,data) => {
    if(err) {
      return res.send({
        code:500,
        msg:err.message
      })
    }
    
    // 如果邮箱存在
    if(data[0]) {
      return res.send({
        code:1,
        msg:"邮箱已存在"
      })
    }
    // 邮箱不存在
    // 2.验证密码
    M_user.checknickname(body.nickname,(err,data)=>{
      if(err) {
        return res.send({
          code:500,
          msg:err.message
        })
      }
      console.log(data);
      // 如果昵称存在
      if(data[0]) {
        return res.send({
          code:2,
          msg:"昵称已存在"
        })
      }
      // 昵称不存在
      // 3.向数据库添加数据
      M_user.addUser(body,(err,data)=>{
        if(err) {
          return res.send({
            code:500,
            msg:err.message
          })
        }
        res.send({
          code:200,
          msg:"注册成功"
        })
      })
    })
  
  })
  
}



