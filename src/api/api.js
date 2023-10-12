import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "https://hot-summer-service.onrender.com";
const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${AsyncStorage.getItem('idToken')}`
  },
});

instance.interceptors.request.use(
  async (config) => {
    const idToken = await AsyncStorage.getItem('idToken')
    if (idToken) {
      config.headers["Authorization"] = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
