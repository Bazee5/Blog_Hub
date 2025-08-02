import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import axios from '../utils/axiosInstance';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) => {
      setInitialValues({ title: res.data.title, content: res.data.content });
    });
  }, [id]);

  const handleSubmit = async (form) => {
    await axios.put(`/blogs/${id}`, form);
    navigate('/');
  };

  if (!initialValues) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
      <BlogForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default EditBlog;
