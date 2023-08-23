const Student = require('../model/Students')
const mongoose = require('mongoose')

//get all students
const getStudents = async (req, res) =>{
  const students = await Student.find({}).sort({createAt:-1}).populate('classtitle', 'classtitle') 

  res.status(200).json(students)
} 

const filterStudentClass =  async (req, res) => {
  try {
    const { classtitle } = req.query; 
    const filteredStudentClass = await Student.find({ classtitle }).populate('classtitle', 'classtitle') 
    // Respond with the result
    if (filteredStudentClass.length === 0) {
      // No students found for the specified class title
      return res.status(404).json({ error: 'No students found for this class title' });
    }
    // Respond with the filtered student class records
    res.status(200).json(filteredStudentClass);
      } catch (error) {
        console.error('Error filtering studnet classes:', error);
        res.status(500).json({ error: 'Failed filtering studnet classes' });
      }
};

// get single student
const getStudent = async (req, res) =>{
const { id } = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "no such student"})
}

const student = await Student.findById(id)

if(!student){
  return res.status(404).json({error: "no such student"})
}

res.status(200).json(student)
}


// create new student
const createNewStudent = async (req, res) => {
    const {name, fname, mname,rollno,email,classtitle} = req.body
    let emptyFields = []

    if(!name){
     emptyFields.push('name')
    }
    if(!fname){
      emptyFields.push('fname')
    }
    if(!mname){
      emptyFields.push('mname')
    }
    if(!rollno){
        emptyFields.push('rollno')
      }
    if(!email){
        emptyFields.push('email')
    } 
    if(!classtitle){
      emptyFields.push('classtitle')
  } 
    if(emptyFields.length > 0)
    {
      return res.status(400).json ({error:"please fill in all the fields", emptyFields})
    }
    //add doc db
    try{
     const student = await Student.create({name, fname, mname,rollno,email,classtitle})
     res.status(200).json(student)
    }
    catch (error){
      res.status(400).json ({error:error.message})
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
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such student"})
  }

  const student = await Student.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!student){
    return res.status(400).json({error:"No such student"})
  }
  res.status(200).json(student)
}

module.exports = {
    getStudents, 
    filterStudentClass,
    getStudent,  
    createNewStudent,
    deleteStudent,
    updateStudent
}