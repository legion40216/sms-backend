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
router.get('/:studentId' , getStudent)

// POST a new stundent
router.post('/', createNewStudent)

// DELETE a new  stundent
router.delete('/:studentId', deleteStudent)

// UPDATE a new  stundent
router.put('/:studentId', updateStudent)

module.exports = router