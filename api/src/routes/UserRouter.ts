import express from "express";
import { UserController } from "../controller/UserController";
import { AppRoutes } from "../app";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);

const userHandle: AppRoutes = {
  path: "/users",
  handle: userRouter,
};

export default userHandle;