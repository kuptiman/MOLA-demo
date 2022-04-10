const asyncHandler = require('express-async-handler')

const Question = require("../models/questionModel")

// @desc    Get questions
// @route   GET /api/questions
// @access  Private
const getQuestions = asyncHandler(async (req, res) => {
   const questions = await Question.find()
   res.status(200).json(questions)
})

// @desc    Set questions, CURRENTLY UNUSED
// @route   POST /api/questions
// @access  Private
const setQuestions = asyncHandler(async (req, res) => {
   const question = await Question.create({
      surveyname: req.body.surveyname,
      questiontext: req.body.questiontext,
      scaletype: req.body.scaletype,
      varname: req.body.varname,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      option5: req.body.option5,
      option6: req.body.option6,
      option7: req.body.option7
   })
   res.status(200).json(question)
})

// @desc    Update questions, CURRENTLY UNUSED
// @route   PUT /api/questions/:id
// @access  Private
const updateQuestions = asyncHandler(async (req, res) => {
   res.status(200).json({message: `Update question ${req.params.id}`})
})

// @desc    Delete questions, CURRENTLY UNUSED
// @route   DELETE /api/questions/:id
// @access  Private
const deleteQuestions = asyncHandler(async (req, res) => {
   res.status(200).json({message: `Delete question ${req.params.id}`})
})

module.exports = {
   getQuestions,
   setQuestions
}