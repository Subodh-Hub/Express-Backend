import db from "../config/db.js";

// Helper function for basic input validation
const validateStudent = (student) => {
  const { name, email, phone, class_name } = student;
  if (!name || !email || !phone || !class_name) {
    return false;
  }
  return true;
};

// GET all students
const getStudents = (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(200).json({
      message: "Students retrieved successfully ✅",
      data: result,
    });
  });
};

// ADD a new student
const addStudent = (req, res) => {
  const { name, email, phone, address, class_name } = req.body;

  // Validate input
  if (!validateStudent({ name, email, phone, class_name })) {
    return res.status(400).json({ message: "Missing required fields ❌" });
  }

  const sql =
    "INSERT INTO students (name, email, phone, address, class_name) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, phone, address || "", class_name],
    (err, result) => {
      if (err) {
        console.error("DB Error:", err);

        // Handle duplicate email
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists ❌" });
        }

        return res
          .status(500)
          .json({ message: "Database error ❌", error: err });
      }

      res.status(201).json({
        message: "Student added successfully ✅",
        studentId: result.insertId,
      });
    },
  );
};

// DELETE a student by ID
const deleteStudent = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error ❌", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    res.status(200).json({ message: "Student deleted successfully ✅" });
  });
};

 
export { getStudents, addStudent, deleteStudent };
