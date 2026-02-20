import express from "express";
import {
  createSubjects,
  deleteSubject,
  getAllSubjects,
} from "../controllers/subjectController.js";

const router = express.Router();

router.get("/", getAllSubjects);
router.post("/", createSubjects);
router.delete("/:id", deleteSubject);

export default router;
