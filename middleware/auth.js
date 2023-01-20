const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/users');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select('-password');
            next();
        }
        catch (error) {

            res.status(401)

            throw new Error('Not Authorized')

        }

        if (!token) {
            res.status(401)
            throw new Error('Not Authorized, no token')
        }




    } else {
        res.status(401)
        throw new Error('Not Authorized, no token');

    }


});


module.exports = { protect };