import api from './api'
export const fillInfo = async (userId, userRequest) => {
    const response = await api.put(`/api/v1/user/updateFill/${userId}`, {
        params: { userRequest: userRequest }
    });
    console.log(response)
    return response.data;
}