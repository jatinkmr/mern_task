const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 8023 || process.env.PORT
require('./database')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// api routes
app.use('/api/v1', require('./routes'))

// routes error hanlder
app.use(function (req, res) {
    res.status(404).send({ url: `No such ${req.originalUrl} url exist. Please try with correct one!!` })
})

// error handler
app.use(function (err, req, res, next) {
    return res.status(500).send({
        error: true,
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT} PORT...`)
})