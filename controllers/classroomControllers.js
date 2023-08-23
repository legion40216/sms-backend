const Classroom = require('../model/Classrooms')
const mongoose = require('mongoose')

//get all classroom
const getClassrooms = async (req, res) =>{
  const classrooms = await Classroom.find({}).sort({createAt:-1}).populate('courseids', 'course')

  res.status(200).json(classrooms)
} 

// create new course
const createClassroom = async (req, res) => {
    const {courseids,classtitle} = req.body

    let emptyFields = []
    if(!courseids.length > 0){
     emptyFields.push('courses')
    }
    if(!classtitle){
      emptyFields.push('class')
     }
    if(emptyFields.length > 0)
    {
      return res.status(400).json ({error:"please select one of each dropdown", emptyFields})
    }
      //add doc db
      try{
        // Check if the provided courseids exist in the Course model
        const existingClasses = await Classroom.find({ classtitle: { $in: classtitle } });
        if (existingClasses.length > 0) {
        return res.status(400).json({ error:'class name already exists'});
        }
        const newClass = await Classroom.create({
          classtitle,
          courseids,
        });
        res.status(200).json(newClass)
       }
       catch (error){
         res.status(400).json ({error:error.message})
       }
}

// delete course

const deleteClassroom = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such course"})
  }

  try{
    const classroom = await Classroom.findByIdAndDelete({_id: id})
    res.status(200).json(classroom)
  }
  catch{
    res.status(400).json ({error:error.message})
  }
}

// update course
const updateClassroom = async (req, res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such course"})
  }

  const classroom = await Classroom.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!classroom){
    return res.status(400).json({error:"No such course"})
  }
  res.status(200).json(classroom)
}

module.exports = {
    getClassrooms,
    createClassroom,
    deleteClassroom,
    updateClassroom
}