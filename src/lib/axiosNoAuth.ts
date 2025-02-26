import axios from 'axios';

const apiNoAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiNoAuth.defaults.headers['x-client'] = 'web';

export default apiNoAuth;
