import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import {
  getAllUsers,
  loginUser,
  signupUser,
  deleteUser,
} from "../controllers/users.controller";

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all registered users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       500:
 *         description: Internal server error
 */

userRouter.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logged in as a existing user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Subodh
 *               email:
 *                 type: string
 *                 example: subodh@gmail.com
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

userRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Add a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Subodh
 *               email:
 *                 type: string
 *                 example: subodh@gmail.com
 *     responses:
 *       201:
 *         description: User added successfully
 */

userRouter.post("/signup", signupUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a registered user using their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user
 *         example: "12345"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete("/:id", deleteUser);

export default userRouter;
