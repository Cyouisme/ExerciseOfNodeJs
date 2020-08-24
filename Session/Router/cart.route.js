var express = require('express');
var router = express.Router();
var controller=require("../Controller/cart.controllers");
router.get("/add/:productId",controller.addToCart); 
module.exports=router;