const User = require('../models/User');
const bcrypt = require('bcrypt');
const joi = require('joi');

const register = async (req, res, next) => {

    const {error:validationError} = validateUser(req.body)

    const {name, email, password} = req.body;

    try {

        if(validationError){
            const error = new Error(validationError.details[0].message)
            error.statusCode = 400;
            throw error;
        }


        const formatedName = name.toLowerCase()
        const formatedEmail = email.toLowerCase()

        const findedUser = await User.findOne({email:formatedEmail})
        if(findedUser){
            const error = new Error('This Email is already Registered')
            error.statusCode = 400
            throw error
        } 

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name:formatedName, email:formatedEmail,password:hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(200).json({message : "User Register Successfully", status:true, newUser})
    } catch(error) {
        next(error)
    }
}
module.exports = register;

function validateUser(data) {
    const userSchema = joi.object({
        name : joi.string().min(2).required(),
        email : joi.string().email().required(),
        password : joi.string().min(6).required(),
    });

    return userSchema.validate(data)
}