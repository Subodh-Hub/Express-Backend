import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Welcome to the School Management System");
});

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);

app.listen(port, () => {
  console.log("Server is running in ", port);
});
