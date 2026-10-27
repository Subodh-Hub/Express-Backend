import bcrypt from "bcrypt";
import db from "../config/db.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
import {
  registerSchema,
  loginSchema,
  adminSchema,
} from "../validation/authValidation.js";

export const createFirstAdmin = async (req, res) => {
  try {
    const validated = adminSchema.parse(req.body);
    const { name, email, password } = validated;

    // Check if admin exists
    const checkSql = "SELECT * FROM users WHERE role='admin'";
    db.query(checkSql, async (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length > 0)
        return res.status(400).json({ message: "Admin already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql =
        "INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)";
      db.query(sql, [name, email, hashedPassword, "admin"], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.json({ success: true, message: "Admin created successfully" });
      });
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// Register User by admin only
const register = async (req, res) => {
  try {
    // ✅ Validate request body
    const validated = registerSchema.parse(req.body);

    const { name, email, password, role, reference_id } = validated;

    // Check if email already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], async (err, existing) => {
      if (err) return res.status(500).json({ error: err });
      if (existing.length > 0)
        return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql =
        "INSERT INTO users(name,email,password,role,reference_id) VALUES (?,?,?,?,?)";

      db.query(
        sql,
        [name, email, hashedPassword, role, reference_id],
        (err) => {
          if (err) return res.status(500).json({ error: err });

          res.json({
            success: true,
            message: "User registered successfully",
          });
        },
      );
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

const login = (req, res) => {
  try {
    const validated = loginSchema.parse(req.body);
    const { email, password } = validated;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: "Invalid credentials" });

      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      res.json({
        success: true,
        accessToken,
        refreshToken,
        role: user.role,
      });
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
