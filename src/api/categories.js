import api from "./api";
export const getListOfCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};
export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};