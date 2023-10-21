import api from './api'
export const login = async () => {
    console.log("Đang login nè má")
    const response = await api.post("/api/v1/auth/authenticate");
    return response.data;
};