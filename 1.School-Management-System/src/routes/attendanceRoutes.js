import express from "express";

import {
  markAttendance,
  getAttendanceByClass,
  getAttendanceByStudent,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/class", getAttendanceByClass);
router.get("/student/:student_id", getAttendanceByStudent);

export default router;
