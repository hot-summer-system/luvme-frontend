import api from './api'
export const fillInfo = async (userId, userRequest) => {
    const response = await api.put(`/api/v1/user/updateFill/${userId}?birthDay=${userRequest.birthDay}&fullName=${encodeURIComponent(userRequest.fullName)}&gender=${userRequest.gender}`);
    console.log(response)
    return response.data;
}