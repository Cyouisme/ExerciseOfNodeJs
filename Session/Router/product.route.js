var express = require('express');
var router = express.Router();
var controller=require("../Controller/Product.controller");
router.get("/",controller.index);
module.exports=router;