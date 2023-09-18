import axios from "axios";
import BASE_URL from "../constants/urls";

export const getUserById = async (id, setIsLoading) => {
    try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const result = await axios.get(
        `${BASE_URL}/user/getById/${id}`, {
            headers: {
                Authorization: token
            }
        }
        );
        const { user } = result.data
        return {
            user,
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

export const editUser = async (body, setIsLoading) => {
    try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const result = await axios.put(
        `${BASE_URL}/user/edit`, 
        body, { headers: { Authorization: token }}
        );
        const { message } = result.data
        return {
            message,
            status: true,
        };
    } catch (err) {
        console.log(err)
        setIsLoading(false);
        const { message } = err.response.data
        return {
            message,
            status: false,
        };
    }
};

export const deleteUser = async (id, setIsLoading) => {
    try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const result = await axios.delete(
        `${BASE_URL}/user/delete/${id}`, {
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

export const resetPassword = async (body, setIsLoading) => {
    try {
        setIsLoading(true);

        const result = await axios.put(
        `${BASE_URL}/user/updatePassword`, 
        body
        );
        const { message } = result.data
        return {
            message,
            status: true,
        };
    } catch (err) {
        console.log(err)
        setIsLoading(false);
        const { message } = err.response.data
        return {
            message,
            status: false,
        };
    }
}