const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
   surveyname: String,
   varname: String,
   answer: Number,
},
{
   timestampes: true,
})

module.exports = mongoose.model('Answer', answerSchema)