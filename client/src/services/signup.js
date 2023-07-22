import axios from "axios";
import BASE_URL from "../constants/urls";

export const signUp = async (body, setIsLoading) => {
  try {
    setIsLoading(true);
    await axios.post(`${BASE_URL}/users/signup`, body);

    return {
      status: true,
    };
  } catch (err) {
    setIsLoading(false);
    console.log(err)
    const { error } = err.response.data;
    return {
      error,
      status: false,
    };
  }
};