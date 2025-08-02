import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Loader2, PenTool, X } from 'lucide-react';
import useAuth from "../context/UseAuth";
import axios from '../utils/axiosInstance';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Toast notification function
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors below');
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      const { data } = await axios.post('/users/login', form);
      login(data); 
      
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => navigate('/'), 1000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      showToast(errorMessage);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        setErrors({ password: 'Invalid email or password' });
      } else if (err.response?.status === 404) {
        setErrors({ email: 'No account found with this email' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your BlogHub account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`
                      block w-full pl-10 pr-3 py-3 border rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                      transition-all duration-200 bg-gray-50 focus:bg-white
                      ${errors.email 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300'
                      }
                    `}
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-2 mt-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-sm text-red-600">{errors.email}</p>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`
                      block w-full pl-10 pr-12 py-3 border rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                      transition-all duration-200 bg-gray-50 focus:bg-white
                      ${errors.password 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300'
                      }
                    `}
                    value={form.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center space-x-2 mt-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-sm text-red-600">{errors.password}</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign in</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className={`
            flex items-center space-x-3 p-4 rounded-lg shadow-lg max-w-md
            ${toast.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
            }
          `}>
            {toast.type === 'success' ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <p className="font-medium">{toast.message}</p>
            <button 
              onClick={() => setToast(null)}
              className="p-1 hover:bg-current hover:bg-opacity-10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;