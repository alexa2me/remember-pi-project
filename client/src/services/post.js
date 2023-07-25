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
    console.log(result)
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