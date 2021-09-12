const fs = require('fs')
const File = require('../models/temp')
const Properties = require('../config/properties')

exports.getAlls = async function (query, page, limit) {
    try {
        const documents = await File.find(query)
        return documents
    } catch (e) {
        throw Error('Error while paginating temporary documents')
    }
}

exports.getTemporaryDocumentById = async function (filter) {
    try {
        let file = await File.findById(filter, { _id: 0 })
        return file
    } catch (e) {
        throw Error('Error getting document')
    }
}

exports.saveTemporaryDocument = async function (documents) {
    try {
        const res = await File.insertMany(documents)
        return res
    } catch (e) {
        throw Error('Error saving temporary documents')
    }
}

exports.deleteTemporaryDocument = async function (filter) {
    try {
        const res = await File.findByIdAndDelete(filter)
        return res
    } catch (e) {
        throw Error('Error deleting temporary document')
    }
}

exports.moveFile = async function (origin, newName, target = Properties.DOCUMENTS) {
    if (!fs.existsSync(target)) fs.mkdirSync(target)
    fs.rename(origin, `${target}${newName}`, (err) => {
        if (err) throw err
    })
}

exports.deleteFile = async function (filename, target = Properties.DOCUMENTS) {
    var file = `${target}${filename}`
    try {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file, (err) => {
                console.log(file)
                if (!err) return true;
                return false
            })
        }
    } catch (e) {
        throw Error('the file could not be deleted')
    }
}