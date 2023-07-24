import { post } from "post";
import connection from "../data/connection";
import { generateId } from "../services/idGenerator";

export const addPost = async (post: post): Promise<void> => {
    await connection("posts").insert(post)
}

export const addPostImages = async (
    postId: string,
    imageUrls: string[]
): Promise<void> => {
    const imageInserts = imageUrls.map((url) => ({
        id: generateId(),
        url,
    }));

    await connection("images_urls").insert(imageInserts);

    const postsUrlsInserts = imageInserts.map((image) => ({
        id: generateId(),
        post_id: postId,
        url_image_id: image.id,
    }))

    await connection("posts_urls").insert(postsUrlsInserts);
};
































