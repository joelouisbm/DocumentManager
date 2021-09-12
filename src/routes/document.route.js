const express = require('express')
const controller = require('../controllers/document.controller')
const router = express.Router()
router.get('/', controller.find)
    .post('/', controller.insert)
    .delete('/:id', controller.delete)
module.exports = router