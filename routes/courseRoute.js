const express =  require('express')
const {
    getCourses, 
    createNewCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseControllers')
 
const router = express.Router()

router.get('/', getCourses)

router.post('/', createNewCourse)

router.delete('/:id', deleteCourse)

router.patch('/:id', updateCourse)

module.exports = router