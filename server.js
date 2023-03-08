import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import authRoutes from './routes/auth.route.js'
import errorHandler from './middleware/error.middleware.js'

dotenv.config({ path : './config/config.env' })

const app = express()

/* MIDDLEWARE */
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

/* ROUTES */
app.use('/api/auth', authRoutes)

/* ERROR MIDDLEWARE */
app.use(errorHandler)

const PORT = process.env.PORT || 3001

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port : ${PORT}`)
    })
}).catch(err => {
    console.log({ error : err.message })
})