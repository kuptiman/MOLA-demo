const express = require('express')
const router = express.Router()
const { getQuestions, 
   setQuestions, 
   updateQuestions, 
   deleteQuestions 
} = require('../controller/questionController')

router.get('/', getQuestions)

router.post('/', setQuestions)

router.put('/:id', updateQuestions)

router.delete('/:id', deleteQuestions)

module.exports = router