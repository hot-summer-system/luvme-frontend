import api from './api'
export const fillInfo = async (userId, credentials) => {
    const response = await api.put(`/api/v1/user/updateFill/${userId}`, credentials);
    return response.data;
}