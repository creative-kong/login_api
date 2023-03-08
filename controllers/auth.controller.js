import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/async.middleware.js'
import ErrorResponse from '../utils/errorResponse.js'

export const register = asyncHandler( async (req, res, next) => {
    const { username, email, password, role } = req.body

    /* GENERATE SALT */
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = new User({
        username,
        email,
        password : passwordHash,
        role
    })

    await newUser.save()
    sendTokenResponse(newUser, 201, res, 'register successfully')
})

export const login = asyncHandler ( async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
        return next(new ErrorResponse('email or password not be empty', 401))
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(ErrorResponse('invalid credentials', 401))
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return next(new ErrorResponse('invalid credentials', 401))
    }
    sendTokenResponse(user, 200, res, 'login successfully')
})

const sendTokenResponse = (user, statusCode, res, message) => {
    const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE
    })

    res.status(statusCode).json({
        token,
        data : {},
        message,
        status : true 
    })
}