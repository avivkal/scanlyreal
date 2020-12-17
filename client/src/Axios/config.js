import axios from 'axios'
import {URL} from '../Constants/const' 

axios.defaults.baseURL = URL;
const token = JSON.parse(localStorage.getItem('token'));
axios.defaults.headers.common['auth-token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';


axios.interceptors.request.use(
    config => {
        let token = JSON.parse(localStorage.getItem('token'));
        if (!config.headers.common['auth-token']) {
        if (token) {
          config.headers.common['auth-token'] = token;
        }
      }
  
      return config;
    },
    error => Promise.reject(error)
  );

export default axios;