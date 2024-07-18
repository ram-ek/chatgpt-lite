const express = require('express')

// controller functions
const { addPrompt, getResp } = require('../controllers/promptsController')
const requireAuth = require('../middleware/authMiddleware')

const router = express.Router()

// auth middleware
router.use(requireAuth)

// add question route
router.post('/add', addPrompt)

// get answer for a question
router.post('/', getResp)

module.exports = router