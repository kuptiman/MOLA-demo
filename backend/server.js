const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

// Establish MongoDB database connection
connectDB()

const app = express()

// Cross Origin Resource Sharing, allow requests/responses from different port numbers
app.use(cors())
// Middleware function to enable JSON payloads
app.use(express.json())
// Enable API routes for questions and answers, and basic API error handling
app.use('/api/questions', require('./routes/questionRoutes'))
app.use('/api/answers', require('./routes/answerRoutes'))
app.use(errorHandler)
// Start backend server
app.listen(port, () => console.log(`Server started on port ${port}`))