import axiosInstance from '../utils/axiosInstance';

export const fetchBlogs = async () => {
  const res = await axiosInstance.get('/blogs');
  return res.data;
};

export const createBlog = async (data) => {
  const res = await axiosInstance.post('/blogs', data);
  return res.data;
};
