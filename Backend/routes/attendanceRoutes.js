const express =require('express');

const { getAttendanceList, updateAttendanceList } = require('../controllers/attendanceController');
const {protectedRoute} =require("../middlewares/protectedRoute")
const router=express.Router();

router.get("/getattendancelist/:date",protectedRoute,getAttendanceList);
router.post("/editattendancelist",protectedRoute,updateAttendanceList);
router.post("/updateattendancelist",protectedRoute,updateAttendanceList);

module.exports=router