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
routes.delete("/user/delete/:id", userAccessController.deleteUser);
routes.put("/user/edit/:id", userAccessController.editUser);
routes.put("/user/updatePassword/:id", userAccessController.resetPassword);


routes.post("/post", postController.createPost);
routes.get("/post/getAll", postController.getPosts);
routes.delete("/post/delete/:id", postController.deletePost);
routes.get("/post/getById/:id", postController.getPostById);
routes.put("/post/edit/:id", postController.editPost);

export default routes;