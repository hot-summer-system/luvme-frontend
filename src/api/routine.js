import api from "./api";
export const getRoutine = async (userId) => {
    const response = await api.get(`/api/v1/routing/${userId}`);
    return response.data;
};
export const modifyRoutine = async (routine) => {
    const response = await api.post('/api/v1/routing/modify', routine);
    return response.data;
};