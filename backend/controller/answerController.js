const asyncHandler = require('express-async-handler')
const Answer = require("../models/answerModel")

// @desc    Get all responses from database
// @route   GET /api/answers
// @access  Private
const getAnswers = asyncHandler(async (req, res) => {
   const answers = await Answer.find()
   res.status(200).json(answers)
})

// @desc    Submit reponses to database
// @route   POST /api/answers
// @access  Private
const setAnswers = asyncHandler(async (req, res) => {
   if (!req.body.surveyname){
      res.status(400)
      throw new Error('No surveyname')
   }
   if (!req.body.answers){
      res.status(400)
      throw new Error('No answer')
   }

   const answer = await Answer.create({
      surveyname: req.body.surveyname,
      answers: req.body.answers,
      duration: req.body.duration
   })
   res.status(200).json(answer)
})

module.exports = {
   getAnswers, 
   setAnswers
}