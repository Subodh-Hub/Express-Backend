import db from "../config/db.js";

// Get All Teacher
const getAllTeacher = (req, res) => {
  const sql = "SELECT * FROM teachers";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
};

// Get Teacher by id
const getTeacherById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM teachers WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching teacher",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      teacher: result[0],
    });
  });
};

// To add new Teacher
const addTeacher = (req, res) => {
  const { name, email, phone, subject, address, qualification, join_date } =
    req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !subject ||
    !address ||
    !qualification ||
    !join_date
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone and subject are required",
    });
  }

  const sql =
    " INSERT INTO teachers (name, email, phone, subject, address, qualification, join_date) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, phone, subject, address, qualification, join_date],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error creating teacher",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Teacher created successfully",
          teacherId: result.insertId,
        });
      }
    },
  );
};

const updateTeacher = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, subject, address, qualification, join_date } =
    req.body;

  const sql =
    "UPDATE teachers SET name=?, email=?, phone=?, subject=?, address=?, qualification=?, join_date=? WHERE id=?";

  db.query(
    sql,
    [name, email, phone, subject, address, qualification, join_date, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error updating teacher",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Teacher updated successfully",
      });
    },
  );
};


// DELETE TEACHER

const deleteTeacher = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM teachers WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting teacher",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  });
};

export {
  getAllTeacher,
  addTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
