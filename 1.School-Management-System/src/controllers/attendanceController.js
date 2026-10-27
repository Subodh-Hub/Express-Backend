import db from "../config/db.js";

const markAttendance = (req, res) => {
  const { student_id, class_id, date, status } = req.body;
  if (!student_id || !class_id || !date || !status) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  } else {
    const sql =
      "INSERT INTO attendance (student_id, class_id, date, status ) VALUES (?,?,?,?)";
    db.query(sql, [student_id, class_id, date, status], (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Attendance marked successfully",
        });
      }
    });
  }
};

const getAttendanceByClass = (req, res) => {
  const { class_id, date } = req.query;

  const sql = `
    SELECT 
      attendance.id,
      students.name AS student_name,
      classes.class_name,
      classes.section,
      attendance.date,
      attendance.status
    FROM attendance
    JOIN students ON attendance.student_id = students.id
    JOIN classes ON attendance.class_id = classes.id
    WHERE attendance.class_id = ? AND attendance.date = ?
  `;

  db.query(sql, [class_id, date], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(200).json({
      success: true,
      attendance: result,
    });
  });
};

const getAttendanceByStudent = (req, res) => {
  const { student_id } = req.params;

  const sql = `
    SELECT 
      attendance.date,
      attendance.status,
      classes.class_name,
      classes.section
    FROM attendance
    JOIN classes ON attendance.class_id = classes.id
    WHERE attendance.student_id = ?
    ORDER BY attendance.date DESC
  `;

  db.query(sql, [student_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(200).json({
      success: true,
      count: result.length,
      attendance: result,
    });
  });
};

export { markAttendance, getAttendanceByClass, getAttendanceByStudent };
