const DocumentService = require('../service/document.service')
const FileService = require('../service/file.service')
const Properties = require('../config/properties')

exports.find = async function (req, res, next) {
    // Validate request, params, etc
    var page = req.params.page ? req.params.page : 1
    var limit = req.params.limit ? req.params.limit : 10
    try {
        const response = await DocumentService.getDocuments({}, page, limit)
        // put together a response for the client
        var documents = await fillResponse(response)        
        return res.status(200).json({ status: 200, data: documents, message: 'Succesfully documents retrived' })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.insert = async function (req, res) {
    // Validate request, params, etc
    const { id, keywords } = req.body
    try {
        var document = await FileService.getTemporaryDocumentById({ _id: id })
        const oldPath = document.path
        document.keywords = keywords
        document.destination = Properties.DOCUMENTS
        document.path = `${document.destination}${document.filename}`
        var response = await DocumentService.insertDocuments([document])
        // clear the collection record and move the file to the final folder
        await FileService.deleteTemporaryDocument({ _id: id })
        await FileService.moveFile(oldPath, document.filename)
        // put together a response for the client
        var files = await fillResponse(response)
        res.status(201).json({ status: 201, message: 'Document Saved!', data: files })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.delete = async function (req, res) {
    // Validate request, params, etc
    const { id } = req.params
    try {
        // the collection record is removed
        const result = await DocumentService.deleteDocument({ _id: id })
        // the file is deleted from the folder
        await FileService.deleteFile(result.filename)
        return res.status(201).json({ status: 200, message: 'the document has been deleted' })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

// the document that will be sent as an answer is assembled
const fillResponse = async (documents) => {
    let newArr = []
    documents.forEach(file => {
        newArr.push({
            id: file._id,
            originalname: file.originalname,
            date: file.date,
            size: file.size,
            keywords: file.keywords
        })
    })
    return newArr
}