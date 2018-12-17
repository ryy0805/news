const express = require("express");
const c_user = require("./controllers/c_user");

const router = express.Router();
router
  .get("/signin",c_user.showSignin)
  .post("/signin",c_user.handleSignin)



// 导出router
module.exports = router;