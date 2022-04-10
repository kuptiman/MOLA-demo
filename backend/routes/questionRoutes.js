const express = require('express')
const router = express.Router()
const { getQuestions, setQuestions } = require('../controller/questionController')

router.get('/', getQuestions)

router.post('/', setQuestions)

module.exports = router