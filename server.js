require('dotenv').config()
const express = require('express')
const studentRoutes = require('./routes/studentRoute')
const attendenceRoutes = require('./routes/attendenceRoute')
const courseRoutes = require('./routes/courseRoute')
const classroomRoutes = require('./routes/classroomRoute')

const app = express()
const mongoose = require('mongoose')

//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/students', studentRoutes)
app.use('/api/attendances', attendenceRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/classrooms', classroomRoutes)



//connect to db 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Connect to db and listining 4000!!")
    })
})
.catch((err)=>{
console.log(err)
})
