import api from "./api";
export const getFirstQuestion = async () => {
    const response = await api.get('/api/v1/question/first');
    return response.data;
};
export const getQuestion = async (questionId) => {
    const response = await api.get(`/api/v1/question/questions/${questionId}`);
    return response.data;
};
export const getResultById = async (resultId) => {
    const response = await api.get(`/api/v1/result/results/${resultId}`);
    return response.data;
};