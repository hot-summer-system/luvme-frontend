import api from './api'
export const fillInfo = async (userId, userRequest) => {
    console.log(userId)
    console.log(userRequest)
    const response = await api.put(`/api/v1/user/updateFill/${userId}`, userRequest);
    console.log(response.status)
    return response.data;
}