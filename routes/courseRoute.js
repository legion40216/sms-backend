const express =  require('express')
const {
    getAllCourses, 
    createNewCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseControllers')
 
const router = express.Router()

router.get('/', getAllCourses)

router.post('/', createNewCourse)

router.delete('/:courseId', deleteCourse)

router.patch('/:courseId', updateCourse)

module.exports = router