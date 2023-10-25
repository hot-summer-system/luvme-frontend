import api from './api'
export const login = async () => {
    const response = await api.post("/api/v1/auth/authenticate");
    return response.data;
};