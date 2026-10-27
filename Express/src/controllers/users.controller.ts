import type { Request, Response, NextFunction } from "express";
import { getAllUsers as findAllUsers } from "../models/users.model";

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  findAllUsers()
    .then((users) => {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const loginUser = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  res.status(200).json({
    message: "Get all user",
    data,
  });
};

const signupUser = (req: Request, res: Response, next: NextFunction): void => {
  const data = req.body;
  res.status(200).json({
    message: "Created a new user",
    data,
  });
};

const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;

  res.status(200).json({
    message: `${id} user deleted successfully`,
  });
};

export { getAllUsers, loginUser, signupUser, deleteUser };
