const Student = require('../model/Students')
const mongoose = require('mongoose')

//get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({})
      .sort({ createdAt: -1 })
      .populate('enrolledClass', 'classtitle');

    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({ error: 'Failed fetching students on server' });
  }
};

// filter specified classtitle from Classroom
const filterStudentClass =  async (req, res) => {
  try {
    const { enrolledClass } = req.query; 

    const filteredStudentClass = await Student.find({ enrolledClass }).populate('enrolledClass', 'classtitle') 
    
    if (filteredStudentClass.length === 0) {
      // No students found for the specified class title
      return res.status(404).json({ error: 'No students found for this classtitle' });
    }
    // Respond with the filtered student class records
    res.status(200).json(filteredStudentClass);
      } catch (error) {
        console.error('Error filtering studnet by classes:', error);
        res.status(500).json({ error: 'Failed filtering studnet by classes' });
      }
};

// create new student
const createNewStudent = async (req, res) => {
  const {name, fatherName, motherName,rollNo,email,enrolledClass} = req.body
 
  let emptyFields = []

  if(!name){
   emptyFields.push('name')
  }
  if(!fatherName){
    emptyFields.push('FatherName')
  }
  if(!motherName){
    emptyFields.push('motherName')
  }
  if(!rollNo){
      emptyFields.push('rollNo')
    }
  if(!email){
      emptyFields.push('email')
  } 
  if(!enrolledClass){
    emptyFields.push('enrolledClass')
} 

  if(emptyFields.length > 0)
  {
    return res.status(400).json ({error:"please fill in all the fields", emptyFields})
  }
  //add doc db
  try{
   const student = await Student.create({name, fatherName, motherName,rollNo,email,enrolledClass})
   res.status(200).json(student)
  }
  catch (error){
    if (error.code === 11000 && error.keyPattern && error.keyPattern.rollNo) {
      // Duplicate key error (rollNo)
      res.status(400).json({ error: 'Roll No: must be unique' });
    } else {
      console.error('Error submiting createNewStudent:', error);
      res.status(500).json({error:error.message})
    }
  }
}

// get single student
const getStudent = async (req, res) =>{
const { studentId } = req.params
try {
  const student = await Student.findById(studentId)

  if ( student ) {
    res.status(200).json(student);
  } else {
    res.status(404).json({error: "no such student"})
  }
} catch (error) {
  console.error('Error in getStudent:', error);
  res.status(500).json({ error: 'Failed to find student on server'});
}
}

// delete student

const deleteStudent = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such student"})
  }

  try{
    const student = await Student.findByIdAndDelete({_id: id})
    res.status(200).json(student)
  }
  catch{
    res.status(400).json ({error:error.message})
  }
}

// update student
const updateStudent = async (req, res) =>{
  const {studentId} = req.params
  const {name, fatherName, motherName,rollNo,email,enrolledClass} = req.body

  let emptyFields = []

  if(!name){
   emptyFields.push('name')
  }
  if(!fatherName){
    emptyFields.push('FatherName')
  }
  if(!motherName){
    emptyFields.push('motherName')
  }
  if(!rollNo){
      emptyFields.push('rollNo')
    }
  if(!email){
      emptyFields.push('email')
  } 
  if(!enrolledClass){
    emptyFields.push('enrolledClass')
} 

  if(emptyFields.length > 0)
  {
    return res.status(400).json ({error:"please fill in all the fields", emptyFields})
  }

try {
  const student = await Student.findByIdAndUpdate({_id: studentId}, {
    ...req.body
  },{ new: true })

  if(!student){
    return res.status(400).json({error:"No such student"})
  }
  res.status(200).json(student)
}
  catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.rollNo) {
      // Duplicate key error (rollNo)
      res.status(400).json({ error: 'roll name must be unique' });
    } else {
      console.error('Error in updateStudent:', error);
      res.status(500).json({ error: 'Failed to update student on server' });
    }
  }
}

module.exports = {
    getStudents, 
    filterStudentClass,
    getStudent,  
    createNewStudent,
    deleteStudent,
    updateStudent
}