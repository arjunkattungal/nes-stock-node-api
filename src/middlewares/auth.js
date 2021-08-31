const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.authenticate = async(req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorized.startsWith('Bearer')) {
        token = req.headers.authorization.split('')[1];
    }
    if (!token) {
        return res.status(401).json({
            sucess: false,
            message: 'Not authorized to access this'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return res.status(401).json({
            sucess: false,
            message: 'Not authorized to access'
        });
    }
};