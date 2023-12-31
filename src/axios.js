import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截器
instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (error) => Promise.reject(error));
// instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));
export default instance;
