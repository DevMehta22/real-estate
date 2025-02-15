require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const routes = require('./routes/userRoutes')
const setupSwagger = require('./swagger')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
// app.use(cors())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// Setup Swagger documentation
setupSwagger(app)

app.use('/api/auth',routes)


mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen((process.env.PORT), () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
