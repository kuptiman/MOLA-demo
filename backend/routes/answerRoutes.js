const express = require('express')
const router = express.Router()
const { getAnswers, setAnswers } = require('../controller/answerController')
// API Routes for answers/responses

router.get('/', getAnswers)
router.post('/', setAnswers)

module.exports = router