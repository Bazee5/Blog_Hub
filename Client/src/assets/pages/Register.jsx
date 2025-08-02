import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  PenTool,
  X,
  CheckCircle,
} from "lucide-react";
import axios from "../utils/axiosInstance";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Toast notification function
  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name) {
      newErrors.name = "Full name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one uppercase and lowercase letter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors below");
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await axios.post("/users/register", form);

      showToast("Registration successful! Redirecting to login...", "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      showToast(errorMessage);

      // Handle specific error cases
      if (err.response?.status === 409) {
        setErrors({ email: "An account with this email already exists" });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) strength += 1;
    if (/(?=.*\d)/.test(password)) strength += 1;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength += 1;

    const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const colors = [
      "",
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
      "text-green-600",
    ];

    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join BlogHub
            </h2>
            <p className="text-gray-600">
              Create your account to start sharing your stories
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={`
                      block w-full pl-10 pr-3 py-3 border rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                      transition-all duration-200 bg-gray-50 focus:bg-white
                      ${
                        errors.name
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }
                    `}
                    value={form.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center space-x-2 mt-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-sm text-red-600">{errors.name}</p>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
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
                      ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }
                    `}
                    value={form.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`
                      block w-full pl-10 pr-12 py-3 border rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                      transition-all duration-200 bg-gray-50 focus:bg-white
                      ${
                        errors.password
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }
                    `}
                    value={form.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
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

                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Password strength:</span>
                      <span className={passwordStrength.color}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          passwordStrength.strength <= 1
                            ? "bg-red-500"
                            : passwordStrength.strength <= 2
                            ? "bg-orange-500"
                            : passwordStrength.strength <= 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

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
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div
            className={`
            flex items-center space-x-3 p-4 rounded-lg shadow-lg max-w-md
            ${
              toast.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }
          `}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
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

export default Register;
