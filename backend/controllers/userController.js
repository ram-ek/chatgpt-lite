const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // add to db
        const user = await User.login(email, password)

        // create token for user
        const token = createToken(user._id)

        res.status(200).json({ email, role: user.role, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, role, password } = req.body

    try {
        // add to db
        const user = await User.signup(email, role, password)

        // create token for user
        const token = createToken(user._id)

        res.status(200).json({ email, role: user.role, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { signupUser, loginUser }