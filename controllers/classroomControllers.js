const Classroom = require('../model/Classrooms')
const mongoose = require('mongoose')

//get all classroom
const getAllClassrooms = async (req, res) =>{
  try{
  const classrooms = await Classroom.find({})
  .sort({createAt:-1})
  .populate('courses', 'courseName')

  if (classrooms.length === 0) {
    return res.status(404).json({ error: 'No classrooms found' });
  }

  res.status(200).json(classrooms)
}
  catch (error) {
    console.error('Error in getClassrooms:', error);
    res.status(500).json({ error: 'Failed fetching classrooms on server' });
  }
} 

// create new course
const createClassroom = async (req, res) => {
    const {courseIds,classtitle} = req.body
    let emptyFields = []
    if(!courseIds.length > 0){
     emptyFields.push('course')
    }
    if(!classtitle){
      emptyFields.push('classtitle')
     }
    if(emptyFields.length > 0)
    {
      return res.status(400).json ({error:"please add courses and class name", emptyFields})
    }
      //add doc db
      try{
        // Check if the provided classtitle exist in the Course model
        // const existingClasses = await Classroom.find({ classtitle: { $in: classtitle } });
        // if (existingClasses.length > 0) {
        // return res.status(400).json({ error:'class name already exists'});
        // }
        const newClass = await Classroom.create({
          classtitle,
          courses: courseIds,
        });
        const createdClassroom = await Classroom.findById(newClass._id).populate('courses');
        res.status(200).json(createdClassroom)
       }
       catch (error){
        console.error('Error in getClassrooms:', error);
        res.status(500).json({ error: 'Failed fetching classroom'  + " " + error.message});
       }
}

// delete course

const deleteClassroom = async (req, res) => {
  const classroomId = req.params.classroomId;
 
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete({_id: classroomId})

    if (deletedClassroom) {
      res.status(200).json(deletedClassroom);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('Error in deleteClassroom:', error);
    res.status(500).json({ error: 'Failed to delete classroom on server'});
  }
}

// update course
const updateClassroom = async (req, res) =>{
  const classroomId = req.params.classroomId
  const {courseIds,classtitle} = req.body; 

  let emptyFields = []
  if(!courseIds.length > 0){
   emptyFields.push('course')
  }
  if(!classtitle){
    emptyFields.push('classtitle')
   }
  if(emptyFields.length > 0)
  {
    return res.status(400).json ({error:"please add courses and class name", emptyFields})
  }

try{
  const classroom = await Classroom.findByIdAndUpdate({_id: classroomId}, {
    classtitle,
    courses: courseIds,
  },{ new: true }).populate('courses');

  if (classroom) {
    res.status(200).json(classroom);
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
}  catch (error) {
  if (error.code === 11000 && error.keyPattern && error.keyPattern.classtitle) {
    // Duplicate key error (classtitle)
    res.status(400).json({ error: 'Class name must be unique' });
  } else {
    console.error('Error in updateClassroom:', error);
    res.status(500).json({ error: 'Failed to update classroom on server' });
  }
}
}

module.exports = {
   getAllClassrooms,
    createClassroom,
    deleteClassroom,
    updateClassroom
}