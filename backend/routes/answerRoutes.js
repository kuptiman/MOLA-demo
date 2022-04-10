const express = require('express')
const router = express.Router()
const { getAnswers, setAnswers } = require('../controller/answerController')

router.get('/', getAnswers)

router.post('/', setAnswers)

module.exports = router