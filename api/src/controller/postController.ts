import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { post } from "../types/post"
import { addPost, addPostImages } from "../data/postQueries";

export default class PostController {
  createPost = async (req: Request, res: Response) => {
    try {
        const { post_title, post_content, post_url } = req.body;

        const token = req.headers.authorization as string;
        const verifiedToken = getTokenData(token)

        if (!verifiedToken) {
            res.statusCode = 401;
            throw new Error("Não autorizado");
        }

        if (!post_title || !post_content) {
            res.statusCode = 422;
            throw new Error("Preencha todos os campos.");
        }

        const newPost: post = {
            id: generateId(),
            post_title,
            post_content,
            user_id: verifiedToken.id,
        }

        await addPost(newPost);

        if(post_url && post_url.length > 0) {
            await addPostImages(newPost.id, post_url);
        }

        res.status(200).send({
            message: "Post adicionado com sucesso!"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
  }
}