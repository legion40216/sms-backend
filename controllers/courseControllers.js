const Course = require('../model/Courses')
const mongoose = require('mongoose')

//get all courses
const getAllCourses = async (req, res) =>{
  try{
    const courseNames = await Course.find({}).sort({createAt:-1})

    if (courseNames.length === 0) {
      return res.status(404).json({ error: 'No courses found' });
    }

    res.status(200).json(courseNames)
  } catch {
    console.error('Error in getCourses:', error);
    res.status(500).json({ error: 'Failed fetching courses on server' });
  }
  
} 

// create new course
const createNewCourse = async (req, res) => {

  const {courseName} = req.body

  let emptyFields = []

  if(!courseName){
   emptyFields.push('courseName')
  }
  if(emptyFields.length > 0)
  {
    return res.status(400).json ({error:"please fill in the fields", emptyFields})
  }
  
  try{
    const course = await Course.create({courseName})
    res.status(200).json(course)
   }
   catch (error){
    console.error('Error in createNewCourse:', error);
    res.status(500).json ({error:'Failed POST courses to server' + " " + error.message})
   }
}

// delete course

const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const deletedCourse = await Course.findByIdAndDelete({_id: courseId})

    if (deletedCourse) {
      res.status(200).json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }

  }
  catch (error) {
    console.error('Error in deleteCourse:', error);
    res.status(500).json({ error: 'Failed to delete course on server'});
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
    getAllCourses, 
    createNewCourse,
    deleteCourse,
    updateCourse
}