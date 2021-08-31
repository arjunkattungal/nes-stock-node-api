const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('./company');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    token: [{
        token: { type: String },
    }, ]
});


UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});


UserSchema.methods.matchPassword = async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
};



UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
    return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User