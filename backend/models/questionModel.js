const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
   surveyname: String,
   questiontext: String,
   scaletype: String,
   varname: String,
   option1: String,
   option2: String,
   option3: String,
   option4: String,
   option5: String,
   option6: String,
   option7: String,
})

module.exports = mongoose.model('Question', questionSchema)