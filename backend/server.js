require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const promptRoutes = require('./routes/prompts')

// express app
const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/users', userRoutes)
app.use('/api/prompts', promptRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })
    })    
    .catch((err) => {
        console.log(err)
    })