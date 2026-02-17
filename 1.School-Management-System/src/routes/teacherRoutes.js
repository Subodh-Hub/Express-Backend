import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacherById,
  updateTeacher,
} from "../controllers/teaherController.js";

const router = express.Router();

router.get("/", getAllTeacher);
router.get("/:id", getTeacherById);
router.post("/", addTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
