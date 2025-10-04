import axiosInstance from '../utils/axiosInstance';

export const createShortUrl = async (url, slug) => {
  const { data } = await axiosInstance.post('/api/create', { url, slug });
  return data.shortUrl;
};

export const getUrlAnalytics = async (urlId) => {
  const { data } = await axiosInstance.get(`/api/${urlId}/analytics`);
  return data;
};

export const deleteShortUrl = async (urlId) => {
  const { data } = await axiosInstance.delete(`/api/create/${urlId}`);
  return data;
};
