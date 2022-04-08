// @desc    Get questions
// @route   GET /api/questions
// @access  Private
const getQuestions = (req, res) => {
   res.status(200).json({ message: 'Get questions' })
}

// @desc    Set questions
// @route   POST /api/questions
// @access  Private
const setQuestions = (req, res) => {
   res.status(200).json({message: 'Set questions'})
}

// @desc    Update questions
// @route   PUT /api/questions/:id
// @access  Private
const updateQuestions = (req, res) => {
   res.status(200).json({message: `Update question ${req.params.id}`})
}

// @desc    Delete questions
// @route   DELETE /api/questions/:id
// @access  Private
const deleteQuestions = (req, res) => {
   res.status(200).json({message: `Delete question ${req.params.id}`})
}

module.exports = {
   getQuestions, 
   setQuestions, 
   updateQuestions, 
   deleteQuestions
}