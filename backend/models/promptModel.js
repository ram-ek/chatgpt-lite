const mongoose = require('mongoose')

const Schema = mongoose.Schema

const promptSchema = new Schema({
    prompt: {
        type: String,
        required: true
    },
    resp: {
        type: String,
        required: true
    }
})

// static add method
promptSchema.statics.add = async function(prompt, resp) {
    // validation
    if(!prompt.trim() || !resp.trim())
        throw Error('All fields are required.')

    // adding question to db
    const exists = await this.findOne({ prompt })

    if(exists)
        throw Error('Question already exists.')

    const row = await this.create({ prompt, resp })

    return row
}

// static fetch method
promptSchema.statics.fetch = async function(prompt) {
    const row = await this.findOne({ prompt })

    if(!row)
        return { prompt, resp: 'Sorry I don\'t have an answer for this.' }

    return row
}

module.exports = mongoose.model('Prompt', promptSchema)