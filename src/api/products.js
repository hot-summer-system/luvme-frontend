import api from "./api";
export const getProductsByCategory = async (categoryCode) => {
    const response = await api.get('/api/v1/product/category/?categoryCode=' + categoryCode);
    return response.data;
};
export const addProductToFavorites = async (productId) => {
    const data = {
        productId: productId
    }
    const response = await api.post('/api/v1/favorite/add', data);
    return response.data;
};
export const removeProductFromFavorites = async (id) => {
    const response = await api.delete(`/api/v1/favorite/remove/${id}`);
    return response.data;
};
export const getFavoriteProducts = async () => {
    const response = await api.get('/api/v1/favorite/get');
    return response.data;
};