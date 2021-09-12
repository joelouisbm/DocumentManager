const Document = require('../models/document')

exports.getDocumentById = async function (filter) {
    try {
        var document = await Document.findById(filter)
        return document
    } catch (e) {
        throw Error('Error getting the document')
    }
}

exports.getDocuments = async function (query, page, limit) {
    try {
        var documents = await Document.find(query)
        return documents;
    } catch (e) {
        throw Error('Error while Paginating documents')
    }
}

exports.insertDocuments = async function (values) {
    try {
        var res = await Document.insertMany(values)
        return res
    } catch (e) {
        throw Error('Error saving documents')
    }
}

exports.deleteDocument = async function (filter) {
    try {
        const result = await Document.findByIdAndDelete(filter)
        return result
    } catch (e) {
        throw Error('error deleting document')
    }
}