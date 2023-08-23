const Attendance = require('../model/Attendance')
const mongoose = require('mongoose')

//GET all attendance records for a specific date or date range
const getAllAttendence =  async (req, res) => {
    try {
      const { startDate, endDate, courseId,classtitleId } = req.query;
      console.log(startDate, endDate,courseId,classtitleId )
      const filter = {}
      if(startDate && endDate)
      {
        filter.date = {    
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      }
      if (courseId) {
        filter.course = courseId;
      }
      if (classtitleId) {
        filter.classtitle = classtitleId;
      }
      
      const attendanceRecords = await Attendance.find(filter)
      .populate('course', 'course').populate('classtitle', 'classtitle')
      .populate('student', 'name')
   
      res.json(attendanceRecords);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
  };

  const checkAttendenceDate =  async (req, res) => {
    try {
  // Implement logic to check attendance records based on date,class,subject
  const { date,classtitle,courseId } = req.query; 
 
  const existingAttendanceRecords = await Attendance.find({ 
    date: new Date(date),classtitle,course:courseId 
  });
  // Determine if attendance records exist for the date
  const attendanceExist = existingAttendanceRecords.length > 0;

  // Respond with the result
  res.status(200).json(attendanceExist)
  
    } catch (error) {
      console.error('Error checking attendance records:', error);
      res.status(500).json({ error: 'Failed to check attendance records' });
    }
  };

// GET attendance records for a specific student
const getStudentAttendence = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const attendanceRecords = await Attendance.find({ student: studentId });
    
        res.json(attendanceRecords);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ error: 'Failed to fetch attendance records' });
      }
};

// POST mark attendance for a specific date
const createNewAttendence = async (req, res) => {
try {
  // Parse the incoming JSON data (array of attendance records)
  const attendanceRecords = req.body;

  // Use insertMany to insert all attendance records into the database
  const attendance = await Attendance.insertMany(attendanceRecords);
  res.status(200).json(attendance)
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};




const deleteAttendance = async (req, res) => {
    const {id} = req.params
  
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "no such attendance"})
    }
  
    try{
      const attendance = await Attendance.findByIdAndDelete({_id: id})
      res.status(200).json(attendance)
    }
    catch{
      res.status(400).json ({error:error.message})
    }
  
  }

  module.exports = {
    getAllAttendence,
    getStudentAttendence,  
    createNewAttendence,
    deleteAttendance,
    checkAttendenceDate,
}