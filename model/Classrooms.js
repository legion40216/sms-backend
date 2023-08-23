const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classroomSchema = new Schema({
    
  classtitle: {
    type: String,
    required: true,
  },
  courseids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
  }],

}, {timestamps:true})

module.exports = mongoose.model('Classroom', classroomSchema)


