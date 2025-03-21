const express =require('express');
const { addVisit, getVisit } = require('../controllers/VisitController');
const {protectedRoute}=require("../middlewares/protectedRoute")
const router=express.Router();

router.post("/addvisit",protectedRoute,addVisit);
router.get("/getvisits",protectedRoute,getVisit)

module.exports=router
