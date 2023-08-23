const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentsSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    mname:{
        type: String,
        required: true
    },
    rollno:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    classtitle:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    }

}, {timestamps:true})

module.exports = mongoose.model('Student', studentsSchema)

