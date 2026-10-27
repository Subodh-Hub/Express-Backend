import express from "express";
import { register, login, createFirstAdmin } from "../controllers/authController.js";
import { refreshToken } from "../controllers/refreshTokenController.js";
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-admin", createFirstAdmin);
// To Create the user by admin
router.post("/register", verifyToken, authorizeRoles("admin"), register);
router.post("/login", login);
router.post("/refresh", refreshToken);

router.post("/refresh", refreshToken);

export default router;
