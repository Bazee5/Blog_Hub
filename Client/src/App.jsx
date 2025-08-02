import useAuth from "../src/assets/context/UseAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import CreateBlog from "./assets/pages/CreateBlog";
import EditBlog from "./assets/pages/EditBlog";
import BlogDetails from "./assets/pages/BlogDetails";
import Profile from "./assets/pages/Profile";
import "./index.css";

const App = () => {
  const { isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
export default App;
