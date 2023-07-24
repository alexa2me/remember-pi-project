import express, { Router, Response } from "express";
import { config } from "dotenv";
import UserAccessController from "./controller/userAccessController";
import PostController from "./controller/postController";

config();

const routes: Router = express.Router();
const userAccessController = new UserAccessController();
const postController = new PostController();

routes.get("/", async (_, res: Response) => {
  res.status(200).send("Connection is on!");
});

routes.post("/signup", userAccessController.signUp);
routes.post("/login", userAccessController.login);
routes.post("/post", postController.createPost);

export default routes;