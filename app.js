// 入口文件

// 1.导包
const express = require('express');
const router = require("./router");
const bodyParser = require('body-parser');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news'
};
const sessionStore = new MySQLStore(options);
// 2.配置

const app = express();
// 统一处理自己的静态资源
app.use("/public",express.static("./public"));
// 处理第三方静态资源
app.use("/node_modules",express.static("./node_modules"));
// 配置模板引擎
app.engine('html', require('express-art-template'));
// 配置body-parser包
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 配置express-session
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }));
// 配置express-mysql-session
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// 3挂载路由
app.use(router);

// 4.监听端口
app.listen(12233,() => {  
  console.log("run it ---");
})