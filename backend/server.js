// https://www.youtube.com/watch?v=-0exw-9YJBo

const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

console.log('Hello World')

const app = express()

app.use('/api/questions', require('./routes/questionRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))

