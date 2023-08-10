import { post } from "post";
import connection from "../data/connection";

export const addPost = async (post: post): Promise<void> => {
    await connection("posts").insert(post)
}

export const getPosts = async (id: string): Promise<any> => {
  const result = await connection("posts")
    .select(
      "posts.id",
      "post_title",
      "post_content",
      "user_id",
      "created_at"
    )
    .where("user_id", `${id}`)
    .orderBy("created_at");

  return result;
};































