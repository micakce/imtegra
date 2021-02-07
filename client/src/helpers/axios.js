import axios from 'axios';
import utilStorage from './utilStorage';


const devUrl = 'http://localhost:3000';
const prodUrl = 'https://imtegra.telecentro.net.ar';

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? devUrl : prodUrl,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Test': 'lo que me de la gana'
  }
})

axiosInstance.interceptors.response.use( response => {
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.clear();
    window.location.reload();
  }
  return Promise.reject(error);
})

export const setTokenInAxios = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

if (utilStorage.tokenExists()) {
  setTokenInAxios(utilStorage.getToken());
}
