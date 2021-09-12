const controller = require('../controllers/file.controller')
const express = require('express')
const router = express.Router()
router.post('/', controller.upload)    
    .get('/:id', controller.download)
module.exports = router