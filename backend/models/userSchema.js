const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 8
    },
    Role: {
        type: String,
        required: true,
        enum: ['Seller', 'Buyer'],
    }
}, {timestamps: true})

userSchema.statics.signup = async function (Email, Password, Role) {

    if(!Email || !Password || !Role) {
        throw Error('All fields must be filled.')
    }

    if(!validator.isEmail(Email)) {
        throw Error('Email is not valid.')
    }

    if(!validator.isStrongPassword(Password)) {
        throw Error('Password is not strong enough.')
    }

    const exists = await this.findOne({Email})

    if(exists) {
        throw Error('Email is already in use.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(Password, salt)

    const User = await this.create({ Email, Password: hash, Role})

    return User
}

userSchema.statics.login = async function (Email, Password) {

    if(!Email || !Password) {
        throw Error('All fields must be filled.')
    }

    const User = await this.findOne({Email})

    if(!User){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(Password, User.Password)

    if(!match) {
        throw Error('Incorrect Password, please provide valid credentials.')
    }

    return User
}

module.exports = mongoose.model('User', userSchema)