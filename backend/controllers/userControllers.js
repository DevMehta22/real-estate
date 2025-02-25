const { default: mongoose} = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = require('../models/userSchema')

const createToken = (_id,role) => {
    return jwt.sign({_id,role}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async (req,res) => {
    const {Email, Password} = req.body 

    try{
        const User = await userSchema.login(Email, Password)

        const token = createToken(User._id,User.Role)

        res.status(200).json({user:{id:User.id,email:User.Email,role:User.Role},token})
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}


const signupUser = async (req,res) => {
    const {Email, Password,Role} = req.body

    try{
        const User = await userSchema.signup(Email, Password, Role)
        
        // create a token

        const token = createToken(User._id)
        
        res.status(200).json({user:{email:User.Email}, token})

    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}