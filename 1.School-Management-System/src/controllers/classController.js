import db from "../config/db.js";

// Get all the class info
const getAllClasses = (req, res) => {
  const sql = "SELECT * FROM classes";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
};

// Get Single Class by id
const getClassById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM classes WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Class not found",
      });
    } else {
      return res.status(200).json(result[0]);
    }
  });
};

// Create Class
const createClass = (req, res) => {
  const { class_name, section } = req.body;

  if (!class_name || !section) {
    return res
      .status(400)
      .json({ message: "Class_name or Section not found!!" });
  }

  const sql = "INSERT INTO classes (class_name,section) VALUES (?,?)";

  db.query(sql, [class_name, section], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json({
        message: "Class created successfully",
        id: result.insertId,
      });
    }
  });
};

// To update the class
const updateClass = (req, res) => {
  const { id } = req.params;
  const { class_name, section } = req.body;

  const sql = "UPDATE classes SET class_name=?, section=? WHERE id=?";

  db.query(sql, [class_name, section, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class Not Found" });
    } else {
      return res.status(200).json({ message: "Class updated successfully" });
    }
  });
};

const deleteClass = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM classes WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Couldnot found the class" });
    } else {
      return res.status(200).json({ message: "Class Delete Successfully" });
    }
  });
};

export { getAllClasses, getClassById, createClass, updateClass, deleteClass };
