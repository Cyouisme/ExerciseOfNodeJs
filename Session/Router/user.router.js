var express = require('express');
var router = express.Router();
var auth=require("../MiddleWare/auth.middle");
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
var controller=require("../Controller/users.controller");
var validate=require("../validate/user.validate")
router.get("/",controller.index)
router.get("/search/",controller.serch)
router.get("/remove/:id",controller.remove)
router.get("/create",controller.create)
router.get("/:id",controller.view)
router.post("/create",upload.single("avatar"),validate.postCreate,controller.createPost)
router.get("/update/:id",controller.Update);
router.post("/update/:id",controller.updatePost);
module.exports=router;
