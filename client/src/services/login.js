import axios from "axios";
import BASE_URL from "../constants/urls";

export const login = async (body, setIsLoading) => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${BASE_URL}/login`, body);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return {
      token,
      status: true,
    };
  } catch (error) {
    setIsLoading(false);
    const { message } = error.response.data
    return {
      message,
      status: false,
    };
  }
};