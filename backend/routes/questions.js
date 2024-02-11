const express = require('express')

// controller functions
const { addQuestion } = require('../controllers/questionController')

const QuestionRouter = express.Router()

// add question route
QuestionRouter.post('/add', addQuestion)

module.exports = QuestionRouter