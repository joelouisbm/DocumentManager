const multer = require('multer')
const fs = require('fs')
const util = require('util')
const properties = require('../config/properties')

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        if (!fs.existsSync(properties.TEMP))
            fs.mkdirSync(properties.TEMP)
        cb(null, properties.TEMP)
    },
    filename: (req, files, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null, `${uniqueSuffix}.${files.originalname}`)
    }
})

const upload = multer({
    storage: storage
}).array('files')

const uploadFileMiddleware = util.promisify(upload)
module.exports = uploadFileMiddleware