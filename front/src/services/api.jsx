import axios from 'axios';
const {
  VITE_ENV,
  VITE_API_URL_LOCAL,
  VITE_API_URL_PROD
} = import.meta.env;
const baseURL = VITE_ENV === 'local' ?
  VITE_API_URL_LOCAL :
  VITE_API_URL_PROD;

const api = axios.create({
  baseURL,
})

export default api;