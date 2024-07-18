const Prompt = require('../models/promptModel')

// add question user
const addPrompt = async (req, res) => {
    const { prompt, resp } = req.body

    try {
        // add to db
        const row = await Prompt.add(prompt, resp)

        res.status(200).json({ prompt, resp })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// get question user
const getResp = async (req, res) => {
    const { prompt } = req.body

    try {
        const row = await Prompt.fetch(prompt)

        res.status(200).json(row)
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { addPrompt, getResp }