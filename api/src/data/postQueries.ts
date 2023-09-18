import connection from "../data/connection";
import { post } from "post";

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

export const deletePost = async (id: string): Promise<any> => {
  await connection("posts").where("id", id).delete();
};

export const updatePost = async (postId: string, newTitle: string, newContent: string): Promise<void> => {
  await connection("posts")
    .update({
      post_title: newTitle,
      post_content: newContent
    })
    .where("id", postId)
};

export const deleteAllPostsByUserId = async (id: string): Promise<void> => {
  await connection("posts").where("user_id", id).delete();
}































