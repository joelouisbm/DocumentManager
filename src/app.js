const properties = require('./config/properties')
const initRouter = require('./routes/routes')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const app = express()
const cnn = require('./config/db.config')
// Settings
app.set('port', properties.PORT)
// Connetion to DB
cnn()
// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes
app.use(express.static(path.join(__dirname, 'public')))
initRouter(app)
// Listening
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})