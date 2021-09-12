const mongoose = require('mongoose')
const properties = require('./properties')
// Connection to DataBase
const cnn = function () {
    mongoose.connect(properties.databaseURL)
        .then(db => {
            console.log({
                message: 'DB is connected!'
            })
        })
        .catch(err => {
            console.log({
                message: 'error connecting to database',
                error: err
            })
        })
}

module.exports = cnn