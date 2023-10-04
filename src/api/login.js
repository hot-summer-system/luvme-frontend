import axios from "axios";
const url = "https://hot-summer-service.onrender.com";

const instance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});
export const login = async (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await instance.post("/api/v1/auth/authenticate");
    return response.data;
};