import axios from 'axios';

const apiPhp = axios.create({
  baseURL: import.meta.env.VITE_API_PHPURL,
});

// apiPhp.defaults.headers['x-client'] = 'web';

export default apiPhp;
