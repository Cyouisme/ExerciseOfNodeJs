var express = require('express');
var validate=require("../validate/auth.roth");
var router = express.Router();
var controller=require("../Controller/aut.controller");
router.get("/login",controller.login);
router.post("/login",validate.postLogin,controller.postLogin)
module.exports=router;