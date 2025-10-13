import axios from 'axios';

export const apiPhp = axios.create({
  baseURL: "/apiphp", // pasa por el proxy
  timeout: 20000,
});

// apiPhp.defaults.headers['x-client'] = 'web';

export default apiPhp;
