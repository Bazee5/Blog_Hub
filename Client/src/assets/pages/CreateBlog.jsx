import BlogForm from '../components/BlogForm';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      await axios.post('/blogs', form);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create blog. Please login.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Create Blog</h2>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBlog;
