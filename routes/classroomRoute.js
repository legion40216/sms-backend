const express =  require('express')
const {
    getClassrooms, 
    createClassroom,
    deleteClassroom,
    updateClassroom
} = require('../controllers/classroomControllers')
 
const router = express.Router()

router.get('/', getClassrooms)

router.post('/', createClassroom)

router.delete('/:id', deleteClassroom)

router.patch('/:id', updateClassroom)

module.exports = router