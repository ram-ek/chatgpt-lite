const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(name, role, email, password) {
    // validation
    if(!name.trim() || !role.trim() || !email || !password.trim())
        throw Error('All fields are required.')

    if(!validator.isEmail(email))
        throw Error('Email not valid.')

    // adding user to db
    const exists = await this.findOne({ email })

    if(exists)
        throw Error('Email already exists.')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, role, email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if(!email || !password.trim())
        throw Error('All fields are required.')

    // checking in db    
    const user = await this.findOne({ email })

    if(!user)
        throw Error('No user found.')

    // checking password
    const match = await bcrypt.compare(password, user.password)

    if(!match)
        throw Error('Incorrect password.')

    return user
}

module.exports = mongoose.model('User', userSchema)