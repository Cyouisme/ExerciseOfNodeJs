var express = require('express')
var router = express.Router()
var controller = require('../controllers/book.controller')
var validate = require('../validation/book.validation')

router.get('/',controller.index)
router.get('/create',controller.create)
router.post('/create',validate.postCreate,controller.postCreate)
router.get('/:id/delete',controller.delete)
router.get('/update/:id',controller.update)
router.post('/update/:id',validate.postUpdate,controller.postUpdate)

module.exports = router;