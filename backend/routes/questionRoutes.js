const express = require('express')
const router = express.Router()
const { getQuestions, setQuestions } = require('../controller/questionController')
// API Routes for questions

router.get('/', getQuestions)
router.post('/', setQuestions)

module.exports = router