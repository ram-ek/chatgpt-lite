const Question = require('../models/questionModel')

// add question user
const addQuestion = async (req, res) => {
    const { question, answer } = req.body

    try {
        // add to db
        const row = await Question.add(question, answer)

        res.status(200).json({ question, answer })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { addQuestion }