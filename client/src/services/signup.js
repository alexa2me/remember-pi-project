import axios from "axios";
import BASE_URL from "../constants/urls";

export const signUp = async (body, setIsLoading) => {
  try {
    setIsLoading(true);
    await axios.post(`${BASE_URL}/signup`, body);

    return {
      status: true,
    };
  } catch (err) {
    setIsLoading(false);
    const { message } = err.response.data;
    return {
      message,
      status: false,
    };
  }
};