require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/questions')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/admin', questionRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })    
    .catch((err) => {
        console.log(err)
    })