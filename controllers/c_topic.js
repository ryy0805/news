//文章控制器C: 文章相关方法实现

const M_topic = require("../models/m_topic");
const moment = require('moment');
//// 渲染文章列表
exports.showTopicList = (req,res)=>{

  M_topic.findAllTopics((err,data)=>{
    if(err) {
      return res.send({
        code:500,
        msg:"服务器出现bug"
      })
    }
    res.render("index.html",{
      topics:data,
      user:req.session.user

    });
  })

  
}

//// 渲染添加文章列表
exports.createTopic = (req,res) => {
  res.render("topic/create.html");
}

// 处理添加文章信息的请求
exports.handleCreateTopic = (req,res) => {
  const body = req.body;

  body.createdAt = moment().format();
  body.userId = req.session.user.id;


  M_topic.addTopic(body,(err,data)=>{
    if(err) {
      return res.send({
        code:500,
        msg:"服务器又出bug了"
      })
    }
    res.send({
      code:200,
      msg:"添加成功"
    })
  })
}
// 渲染文章详情页面
exports.showTopicDetail = (req,res) => {
  // 获取动态路由参数
  // console.log(req.params);
  const topicID = req.params.topicID;
  // console.log(topicID);
  // 查询数据库信息
  M_topic.findTopicById(topicID,(err,data) => {
    if(err) {
      return res.send({
        code:500,
        msg:"服务器崩塌了"
      })
    }
    res.render("topic/show.html",{
      topic:data[0],
      // sessionUserId:req.session.user.id
      sessionUserId:req.session.user ? req.session.user.id : 0
    });
    
  })
}

// 处理文章详情删除操作请求
exports.handleDeleTopic = (req,res) => {
  const topicID = req.params.topicID;
  M_topic.deleTopicById(topicID,(err,data) => {
    if(err) {
      return res.send({
        code:500,
        msg:err.message
      });
    }
    // 重定向到列表页
    res.redirect("/");
  })
}

// 渲染编辑页面
exports.showEditTopic = (req,res) => {
  
  const topicID = req.params.topicID;
  M_topic.findTopicById(topicID,(err,data) => {
    if(err) {
      return res.send({
        code:500,
        msg:err.message
      })
    }
    res.render("topic/edit.html",{
      topic:data[0]
    });
  })
}

// 提交编辑页面
exports.handleEcitTopic = (req,res) => {
  const topicID = req.params.topicID;
  const body = req.body;
  M_topic.editTopic(topicID,body,(err,data) => {
    if(err) {
      return res.send({
        code:500,
        msg:err.message
      })
    }
    // 修改成功
    res.send({
      code:200,
      msg:"修改成功"
    });
  })
};