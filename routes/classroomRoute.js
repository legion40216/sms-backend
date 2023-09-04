const express =  require('express')
const {
    getAllClassrooms, 
    createClassroom,
    deleteClassroom,
    updateClassroom
} = require('../controllers/classroomControllers')
 
const router = express.Router()

router.get('/', getAllClassrooms)

router.post('/', createClassroom)

router.delete('/:classroomId', deleteClassroom)

router.put('/:classroomId', updateClassroom)

module.exports = router