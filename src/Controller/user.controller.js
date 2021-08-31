const User = require('../model/user');

exports.register = async(req, res, next) => {
    const {
        username,
        password
    } = req.body;

    if (!username ||
        !password) {
        return res.status(400).json({
            sucess: false,
            message: 'All fields are mandatory'
        });
    }
    try {
        const newuser = new User({
            username,
            password
        });
        await newuser.save();
        return res.status(201).json({
            sucess: true,
            message: 'User Registered',
            user: newuser
        })
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong"
        })
    }
}

exports.login = async(req, res, next) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            sucess: false,
            message: 'Username and password required'
        });
    }
    let user;
    user = await User.findOne({
        username: username,
    });
    if (!user) {
        return res.status(404).json({
            sucess: false,
            message: 'User doesnot Exist'
        })
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({
            sucess: false,
            message: 'Incorrect password',
        });
    }
    const token = await user.generateAuthToken();
    user.tokens = user.token.concat({ token });
    await user.save();
    return res.status(200).json({
        sucesss: true,
        message: 'User sucessfully logged in',
        data: {
            userId: user._id,
            token: token
        }
    })
}