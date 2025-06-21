

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "customer",
  })
   const navigate=useNavigate();
  
  const dispatch=useDispatch();

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Account created successfully! Please login to continue.");
        navigate("/login");
      } else {
        alert(data.message || "Failed to create account");
        if (data.errors) {
          setErrors(data.errors);
        }
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#DFD0B8] to-white px-4 py-6">
  <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-[#948979]/30">
    
    {/* Header */}
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold text-[#222831]">Customer Signup</h2>
      <p className="text-sm text-[#393E46]">Join Our Pet Family</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {/* Full Name */}
      <div>
        <label className="block mb-1 text-[#393E46]">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Your name"
          className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#948979] bg-[#DFD0B8]/30 text-[#222831] ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 text-[#393E46]">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#948979] bg-[#DFD0B8]/30 text-[#222831] ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 text-[#393E46]">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            className={`w-full px-3 py-2 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#948979] bg-[#DFD0B8]/30 text-[#222831] ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#948979]"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 mt-2 bg-[#222831] text-white rounded-md font-semibold text-sm hover:bg-[#393E46] transition-all disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>

    {/* Login Link */}
    <p className="mt-4 text-xs text-center text-[#393E46]">
      Already have an account?{" "}
      <a href="/login" className="text-[#222831] font-medium underline hover:text-[#948979]">
        Login here
      </a>
    </p>
  </div>
</div>

  )
}
