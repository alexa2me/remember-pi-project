import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { generateId } from "../services/idGenerator";
import { post, postData } from "../types/post"
import { addPost, getPosts, deletePost, updatePost, deleteAllPostsByUserId } from "../data/postQueries"; 
import formatData from "../utils/formatData";

export default class PostController {
  createPost = async (req: Request, res: Response) => {
    try {
        const { post_title, post_content } = req.body;

        const token = req.headers.authorization;
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

        res.status(200).send({
            message: "Post adicionado com sucesso!"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
  }

  getPosts = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const verifiedToken = getTokenData(token);

      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }
      const post = await getPosts(verifiedToken.id);

      const postMap = post.map((item: postData) => {
        return {
          id: item.id,
          postTitle: item.post_title,
          postContent: item.post_content,
          createdAt: formatData(item.created_at),
          userId: item.user_id,
        };
      });

      res.status(200).send({ posts: postMap });
    } catch (err: any) {
      res.status(400).send({
        message: err.message,
      });
    }
  };

  editPost = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { post_title, post_content } = req.body;
    try {
      await updatePost(id, post_title, post_content);
  
      return res.status(200).json({ message: 'Atualizado com sucesso', updated_post_content: post_content, updated_post_title: post_title });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar' });
    }
  };


  deletePost = async (req: Request, res: Response) => {    
    try {
      const { id } = req.params;
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);
  
      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }
  
      await deletePost(id);
  
      return res.status(200).json({ message: 'Post removido com sucesso' });
    } catch (err: any) {
      return res.status(400).send({
        message: err.message,
      });
    }
    
  };

  deleteAllPostsByUserId = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);
  
      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }
  
      await deleteAllPostsByUserId(verifiedToken.id);
  
      return res.status(200);
    } catch (err: any) {
      return res.status(400).send({
        message: err.message,
      });
    }
  };
}