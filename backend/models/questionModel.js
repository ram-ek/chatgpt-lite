const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

// static add method
questionSchema.statics.add = async function(question, answer) {
    // validation
    if(!question.trim() || !answer.trim())
        throw Error('All fields are required.')

    // adding question to db
    const exists = await this.findOne({ question })

    if(exists)
        throw Error('Question already exists.')

    const row = await this.create({ question, answer })

    return row
}

module.exports = mongoose.model('Question', questionSchema)