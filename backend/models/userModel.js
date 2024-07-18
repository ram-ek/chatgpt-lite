const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, role, password) {
    // validation
    if(!email.trim() || !role.trim() || !password.trim())
        throw Error('All fields are required.')

    if(!validator.isEmail(email))
        throw Error('Email not valid.')

    if(!validator.isStrongPassword(password))
        throw Error('Password is not strong enough (1 Uppercase, 1 Lowercase, 1 Number, 1 Special character is required).')

    // adding user to db
    const exists = await this.findOne({ email })

    if(exists)
        throw Error('User already exists.')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, role, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if(!email.trim() || !password.trim())
        throw Error('All fields are required.')

    // checking in db    
    const user = await this.findOne({ email })

    if(!user)
        throw Error('User not found.')

    // checking password
    const match = await bcrypt.compare(password, user.password)

    if(!match)
        throw Error('Incorrect password.')

    return user
}

module.exports = mongoose.model('User', userSchema)