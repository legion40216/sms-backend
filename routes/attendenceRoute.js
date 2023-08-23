const express =  require('express')
const {
    getAllAttendence,
    getStudentAttendence,  
    createNewAttendence,
    deleteAttendance,
    checkAttendenceDate,
} = require('../controllers/attendanceControllers')
 
const router = express.Router()

// GET all stundents
router.get('/', getAllAttendence)

// NEW Check attendance records based on a specific date
router.get('/check', checkAttendenceDate)

// GET a single  stundent
router.get('/:id' , getStudentAttendence)

// POST a new  stundent
router.post('/', createNewAttendence)

// DELETE a new  stundent
router.delete('/:id', deleteAttendance)

module.exports = router