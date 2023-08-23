const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      classtitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Classroom',
        required: true,
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required: true,
      },
      present: {
        type: Boolean,
        required: true,
      },

}, {timestamps:true})

module.exports = mongoose.model('Attendance', attendanceSchema)


