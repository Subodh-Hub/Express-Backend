import db from "../config/db.js";

// To create the subject
const createSubjects = (req, res) => {
  const { subject_name, class_id, teacher_id } = req.body;

  if (!subject_name || !class_id || !teacher_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const sql =
    "INSERT INTO subjects (subject_name,class_id,teacher_id) VALUES (?,?,?)";

  db.query(sql, [subject_name, class_id, teacher_id], (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Subject created successfully",
        id: result.insertId,
      });
    }
  });
};

// To get all subject

const getAllSubjects = (req, res) => {
  const sql = `SELECT 
      subjects.id,
      subjects.subject_name,
      classes.class_name,
      classes.section,
      teachers.name AS teacher_name,
      subjects.created_at
    FROM subjects
    JOIN classes ON subjects.class_id = classes.id
    JOIN teachers ON subjects.teacher_id = teachers.id
    ORDER BY subjects.id DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        subjects: result,
      });
    }
  });
};

// To delete subject by id

const deleteSubject = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM subjects WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  });
};

export { createSubjects, getAllSubjects, deleteSubject };
