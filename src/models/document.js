const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    fieldname: {
        type: String,
        required: false
    },
    originalname: {
        type: String,
        required: true
    },
    encoding: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,        
    },
    keywords: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const documentModel = mongoose.model('document', documentSchema)
module.exports = documentModel