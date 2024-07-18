const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers

    if(!authorization)
        return res.status(401).json({ error: 'Unauthorized access.' })

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')

        next()
    }
    catch(err) {
        res.status(401).json({ error: 'Unauthorized access.' })
    }
}

module.exports = requireAuth