import axios from "axios";

const url = "https://hot-summer-service.onrender.com";
const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    },
});
export const login = async (idToken) => {
    api.defaults.headers.post['Authorization'] = "Bearer " + idToken;
    const response = await api.post("/api/v1/auth/authenticate");
    return response.data;
};