const mongoose = require('mongoose')
// Model for responses to be added to database

const answerSchema = mongoose.Schema({
   surveyname: String,
   varname: String,
   answer: Number,
},
{
   timestampes: true,
})

module.exports = mongoose.model('Answer', answerSchema)