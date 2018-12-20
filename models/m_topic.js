//查询处理文章相关数据库信息


const conn = require("../config/my_db");

// 查询所有文章
exports.findAllTopics = (callback) => {
   const sqlstr = "select * from topics order by id desc";
   conn.query(sqlstr,(err,data)=>{
      if(err) {
        return callback(err);
      }
      callback(null,data);
   })
};
// 添加文章
exports.addTopic = (body,callback) =>{
   const sqlstr = "insert into topics set ?";
   conn.query(sqlstr,body,(err,data)=> {
      if(err) {
         return callback(err);
      }
      callback(null,data);

   })
};
// 根据topicID查询详情页评论页面
exports.findTopicById = (topicID,callback) =>{
   const sqlstr = "select * from topics where id=?";
   conn.query(sqlstr,topicID,(err,data) => {
      if(err) {
         return callback(err);
      }
      callback(null,data);
   });

};

// 删除
exports.deleTopicById = (topicID,callback) => {
   const sqlstr = "delete from topics where id=?";
   conn.query(sqlstr,topicID,(err,data) => {
      if(err) {
         return callback(err);
      }
      callback(null,data);
   });
}

// 根据idb编辑页面
exports.editTopic = (topicID,body,callback) => {
   const sqlstr = "update topics set ? where id=?";
   conn.query(sqlstr,[body,topicID],(err,data) => {
      if(err) {
         return callback(err);
      }
      callback(null,data);
   })
}