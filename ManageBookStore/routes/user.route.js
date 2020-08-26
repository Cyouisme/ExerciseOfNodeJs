var express = require("express");
var router = express.Router();
var controller = require('../controllers/users.controller')
var validate = require('../validation/user.validation')

router.get("/", controller.index);
router.get("/user", controller.search);
router.get("/create", controller.create);
router.post("/create", validate.postCreate,controller.postCreate);
router.get("/:id/delete", controller.delete);
router.get("/update/:id", controller.update);
router.post("/update/:id", validate.postUpdate,controller.postUpdate);
router.get('/view/:id',controller.view);

module.exports = router;
