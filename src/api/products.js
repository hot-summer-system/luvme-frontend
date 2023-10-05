import api from "./api";
export const getSuitableProducts = async () => {
    const response = await api.get('/api/v1/product/suitableSkinType');
    return response.data;
};