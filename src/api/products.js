import api from "./api";
export const getProductsByCategory = async (categoryCode) => {
    const response = await api.get('/api/v1/product/category/?categoryCode=' + categoryCode);
    return response.data;
};