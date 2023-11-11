import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from "../../firebase";
import { login } from "./login";

const url = "https://hot-summer-service.onrender.com";
const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
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
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if ((err.response.status === 403 || err.response.status === 401) && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const idToken = await FIREBASE_AUTH.currentUser.getIdToken()
          console.log("reload", idToken);
          await AsyncStorage.setItem('idToken', idToken)
          await login(idToken)
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
