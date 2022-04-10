const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use('/api/questions', require('./routes/questionRoutes'))
app.use('/api/answers', require('./routes/answerRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

// thanks to https://www.youtube.com/watch?v=-0exw-9YJBo
