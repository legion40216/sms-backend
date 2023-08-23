const Course = require('../model/Courses')
const mongoose = require('mongoose')

//get all courses
const getCourses = async (req, res) =>{
  const courseNames = await Course.find({}).sort({createAt:-1})

  res.status(200).json(courseNames)
} 

// create new course
const createNewCourse = async (req, res) => {
  const {course} = req.body
  console.log(course)
  let emptyFields = []

  if(!course){
   emptyFields.push('course')
  }
  if(emptyFields.length > 0)
  {
    return res.status(400).json ({error:"please fill in all the fields", emptyFields})
  }
  
  try{
   const courseName = await Course.create({course})
   res.status(200).json(courseName)
  }
  catch (error){
    res.status(400).json ({error:error.message})
  }
}

// delete course

const deleteCourse = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such course"})
  }

  try{
    const courseName = await Course.findByIdAndDelete({_id: id})
    res.status(200).json(courseName)
  }
  catch{
    res.status(400).json ({error:error.message})
  }

}


// update course
const updateCourse = async (req, res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such course"})
  }

  const courseName = await Course.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!courseName){
    return res.status(400).json({error:"No such course"})
  }
  res.status(200).json(courseName)
}

module.exports = {
    getCourses, 
    createNewCourse,
    deleteCourse,
    updateCourse
}