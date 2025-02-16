require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const sellerRoutes = require('./routes/sellerRoutes')
const buyerRoutes = require('./routes/buyerRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const setupSwagger = require('./swaggerui')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
// app.use(cors())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})



app.use('/api/auth',userRoutes)
app.use('/api/seller',sellerRoutes)
app.use('/api/buyer',buyerRoutes)
app.use('/api/subscription',subscriptionRoutes)
// Setup Swagger documentation
setupSwagger(app)

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
