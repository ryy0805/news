// 1.导包
const express = require("express");
const c_user = require("./controllers/c_user");
const c_topic = require("./controllers/c_topic");

// 2.实例化
const router = express.Router();
// 3.监听请求
router
  .get("/signin",c_user.showSignin)
  .post("/signin",c_user.handleSignin)
  .get("/",c_topic.showTopicList)
  .get("/topic/create",c_topic.createTopic)
  .post("/topic/create",c_topic.handleCreateTopic)
  .get("/signout",c_user.handleSignout)          //退出
  // 动态路由
  .get("/topic/show/:topicID",c_topic.showTopicDetail)   //展示详情页
  .get("/topic/:topicID/delete",c_topic.handleDeleTopic)     //文章详情页-删除文章
  .get("/topic/:topicID/edit",c_topic.showEditTopic)     //展示编辑页面
  .post("/topic/edit/:topicID",c_topic.handleEcitTopic)   //编辑页面提交
  .get("/signup",c_user.showSignup)        //展现注册页面
  .post("/signup",c_user.handleSignup)     //用户注册信息



// 4导出router
module.exports = router;