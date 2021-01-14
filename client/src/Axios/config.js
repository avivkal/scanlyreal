import axios from 'axios'
import {URL} from '../Constants/const' 

axios.defaults.baseURL = URL;
const token = JSON.parse(localStorage.getItem('token'));
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(
    config => {
        let token = JSON.parse(localStorage.getItem('token'));
        if (!config.headers.common['Authorization']) {
        if (token) {
          config.headers.common['Authorization'] = token;
        }
      }
  
      return config;
    },
    error => Promise.reject(error)
  );

export default axios;