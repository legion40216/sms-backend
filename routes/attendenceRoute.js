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

// POST mark attendance for a specific date
router.post('/mark', createNewAttendence)

// GET a single attendance stundent
router.get('/:attendanceId' , getStudentAttendence)

// DELETE a new attendance
router.delete('/:attendanceId', deleteAttendance)

module.exports = router