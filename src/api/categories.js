import api from "./api";
export const getCategories = async () => {
    const response = await api.get('/api/v1/category/getAll/');
    return response.data;
};