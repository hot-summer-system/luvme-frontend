import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log(idToken);
    if (idToken) {
      config.headers["Authorization"] = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (originalConfig.url !== "/api/v1/auth/authenticate" && err.response) {
//       // Access Token was expired
//       if (err.response.status === 403 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {

//           return instance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// export default instance;
