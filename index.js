// APP CONFIG
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./router')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use('/images', express.static('public'))
app.use('/api', router)

// DATABASE CONFIG
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', () => console.log('Failed to Connect Database'))
db.once('open', () => console.log('Connected to Database'))


// RUN APP
app.listen(port, console.log('Server Started on Port ' + port))