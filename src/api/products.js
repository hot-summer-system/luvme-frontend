import api from "./api";
export const getListOfProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};
export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};