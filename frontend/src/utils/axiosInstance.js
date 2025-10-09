import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  timeout: 10000, // 10s
  withCredentials: true,
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 [AXIOS REQUEST]', config.method.toUpperCase(), config.url);
    console.log('📤 [AXIOS REQUEST] Base URL:', config.baseURL);
    console.log(
      '📤 [AXIOS REQUEST] Full URL:',
      `${config.baseURL}${config.url}`
    );
    console.log('📤 [AXIOS REQUEST] With Credentials:', config.withCredentials);
    console.log('📤 [AXIOS REQUEST] Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ [AXIOS REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    console.log(
      '📥 [AXIOS RESPONSE] Success:',
      response.status,
      response.config.url
    );
    console.log('📥 [AXIOS RESPONSE] Data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ [AXIOS RESPONSE ERROR] Full error:', error);

    // Handle different types of errors
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      const { status, data } = error.response;

      console.error('❌ [AXIOS RESPONSE ERROR] Status:', status);
      console.error('❌ [AXIOS RESPONSE ERROR] Data:', data);
      console.error(
        '❌ [AXIOS RESPONSE ERROR] Headers:',
        error.response.headers
      );

      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          break;
        case 401:
          console.error('Unauthorized:', data);
          // You could redirect to login page or refresh token here
          break;
        case 403:
          console.error('Forbidden:', data);
          break;
        case 404:
          console.error('Not Found:', data);
          break;
        case 500:
          console.error('Server Error:', data);
          break;
        default:
          console.error(`Error (${status}):`, data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('❌ [AXIOS] Network Error: No response received');
      console.error('❌ [AXIOS] Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('❌ [AXIOS] Setup Error:', error.message);
    }

    // You can customize the error object before rejecting
    return Promise.reject({
      // isAxiosError: true,
      message:
        error.response?.data?.message ||
        error.message ||
        'Unknown error occurred',
      status: error.response?.status,
      data: error.response?.data,
      // originalError: error
    });
  }
);
export default axiosInstance;
