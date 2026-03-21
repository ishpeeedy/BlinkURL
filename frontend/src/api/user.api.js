import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (password, email) => {
  console.log('🌐 [API] loginUser called');
  console.log('🌐 [API] Email:', email);
  console.log('🌐 [API] Calling POST /api/auth/login');

  const { data } = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });

  console.log('✅ [API] loginUser response:', data);
  return data;
};

export const registerUser = async (name, password, email) => {
  const { data } = await axiosInstance.post('/api/auth/register', {
    name,
    email,
    password,
  });
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post('/api/auth/logout');
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('/api/auth/me');
  return data;
};

export const getAllUserUrls = async () => {
  const { data } = await axiosInstance.post('/api/user/urls');
  return data;
};
