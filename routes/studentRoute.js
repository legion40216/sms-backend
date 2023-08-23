const express =  require('express')
const {
    getStudents,
    filterStudentClass,
    getStudent, 
    createNewStudent,
    deleteStudent,
    updateStudent
} = require('../controllers/studentControllers')
 
const router = express.Router()

// GET all stundents
router.get('/', getStudents)

// NEW filter classes based on given class
router.get('/filter', filterStudentClass)

// GET a single  stundent
router.get('/:id' , getStudent)

// POST a new  stundent
router.post('/', createNewStudent)

// DELETE a new  stundent
router.delete('/:id', deleteStudent)

// UPDATE a new  stundent
router.patch('/:id', updateStudent)

module.exports = router