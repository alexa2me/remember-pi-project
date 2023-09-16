import axios from "axios";
import BASE_URL from "../constants/urls";

export const post = async (body, setIsLoading) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const result = await axios.post(
        `${BASE_URL}/post`,
        body,
        {
            headers: {
                Authorization: token
            }
        }
       
    );
    const { message } = result.data
    return {
        message,
        status: true,
    };
  } catch (err) {
    setIsLoading(false);
    const { error } = err.response.data
    return {
        error,
        status: false,
    };
  }
};

export const deletePost = async (id, setIsLoading) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const result = await axios.delete(
      `${BASE_URL}/post/delete/${id}`, {
        headers: {
            Authorization: token
        }
      }
       
    );
    const { message } = result.data
    return {
        message,
        status: true,
    };
  } catch (err) {
    setIsLoading(false);
    const { error } = err.response.data
    return {
        error,
        status: false,
    };
  }
};

export const editPost = async (id, { post_title, post_content }, setIsLoading) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const result = await axios.put(
      `${BASE_URL}/post/edit/${id}`,
      {
        post_title,
        post_content,
      },
      {
        headers: {
            Authorization: token
        }
      }
       
    );
    const { message, updated_post_content, updated_post_title } = result.data
    console.log(result.data)
    return {
        updated_post_content,
        updated_post_title,
        message,
        status: true,
    };
  } catch (err) {
    setIsLoading(false);
    const { error } = err.response.data
    return {
        error,
        status: false,
    };
  }
};

export const getPostById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const result = await axios.get(
      `${BASE_URL}/post/getById/${id}`,
      {
        headers: {
            Authorization: token
        }
      }
       
    );
    const { message } = result.data
    return {
        message,
        status: true,
    };
  } catch (err) {
    const { error } = err.response.data
    return {
        error,
        status: false,
    };
  }
}