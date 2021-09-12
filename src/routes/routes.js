const initRouter = (app) => {
    app.use('/files', require('./file.route'))
    app.use('/documents', require('./document.route'))
}

module.exports = initRouter