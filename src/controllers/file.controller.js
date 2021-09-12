const uploadFile = require('../middlewares/uploadFile')
const utilities = require('../utilities/utilities')
const FileService = require('../service/file.service')
const DocumentService = require('../service/document.service')

exports.upload = async function (req, res) {
    try {
        await uploadFile(req, res)
        if (req.files == undefined) {
            res.status(400).json({ status: 400, message: 'No se adjuntó ningún archivo' })
        }
        let files = req.files
        const date = utilities.getCurrentDate()
        files.forEach(file => file.date = date)
        // the record is stored in the collection 'temporary'
        const result = await FileService.saveTemporaryDocument(files)
        var newFiles = [];
        result.forEach(file => {
            // returns the id and name of the record
            newFiles.push({ id: file._id, name: file.originalname })
        })
        res.status(201).send({ files: newFiles, message: 'the documents were uploaded successfully !' })
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })
    }
}

exports.download = async function (req, res) {
    try {
        const { id } = req.params
        // finding the record in the collection for get the path the file
        const document = await DocumentService.getDocumentById({ _id: id })        
        res.download(document.path, document.filename, function (err) {
            if (err) res.status(400).send({ message: 'no existe el documento', error: err })
        })
    } catch (e) {
        res.status(400).json({ statu: 400, message: e.message })
    }
}