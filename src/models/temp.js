const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tempSchema = new Schema({
    fieldname: {
        type: String,
        required: false
    },
    originalname: {
        type: String,
        required: false
    },
    encoding: {
        type: String,
        required: false
    },
    mimetype: {
        type: String,
        required: false
    },
    destination: {
        type: String,
        required: false
    },
    filename: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    keywords: {
        type: String,
        required: false
    }
}, {
    versionKey: false
})

const tempModel = mongoose.model('temporary', tempSchema)
module.exports = tempModel