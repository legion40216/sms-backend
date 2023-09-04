const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentsSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    fatherName:{
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true
    },
    rollNo:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    enrolledClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    }
 

}, {timestamps:true})

module.exports = mongoose.model('Student', studentsSchema)

