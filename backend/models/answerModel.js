const mongoose = require('mongoose')
// Model for responses to be added to database

const answerSchema = mongoose.Schema({
   surveyname: String,
   answers: [{
      questionnumber: String,
      questionanswer: String,
   }],
   duration: Number,
},
{
   timestamps: true,
})

module.exports = mongoose.model('Answer', answerSchema)