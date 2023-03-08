import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'username, email or password not be empty'],
        min : [5, `username can't be less than 5 characters`],
        maxlength : [15, `username can't be more than 15 characters`],
        unique : true
    },
    email : {
        type : String,
        required : [true, 'username, email or password not be empty'],
        unique : true,
        validate : [validator.isEmail, 'invalid email']
    },
    password : {
        type : String,
        required : [true, 'username. email or password not be empty'],
        select : false
    },
    role : {
        type : String,
        enum : [ 'user', 'admin' ],
        default : 'user'
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
}, { 
    timestamps : true 
})

export default mongoose.model('User', userSchema)