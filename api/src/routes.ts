import express, { Router, Response } from "express";
import { config } from "dotenv";
import UserAccessController from "./controller/userAccessController";
import PostController from "./controller/postController";
import { rateLimit } from "express-rate-limit";

config();

const routes: Router = express.Router();
const userAccessController = new UserAccessController();
const postController = new PostController();

const signupLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  message: "Você excedeu o número limite de tentativas de criar conta, tente novamente mais tarde."
})

const loginLimiter = rateLimit({
	windowMs: 3 * 60 * 1000, // 3 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 3 minutes)
  message: "Você excedeu o número limite de tentativas de login, tente novamente mais tarde."
})

const postLimiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 15, // Limit each IP to 100 requests per `window` (here, per 2 minutes)
  message: "Você excedeu o número máximo de postagens, tente novamente mais tarde."
})

routes.get("/", async (_, res: Response) => {
  res.status(200).send("Connection is on!");
});

routes.post("/signup", userAccessController.signUp, signupLimiter);
routes.post("/login", userAccessController.login, loginLimiter);
routes.post("/post", postController.createPost, postLimiter);
routes.get("/post/getAll", postController.getPosts);

export default routes;