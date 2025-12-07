
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice"
import { Mail, Lock, Eye, EyeOff, User, Briefcase } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select your role");
      return;
    }

    dispatch(login(formData)).then((data) => {
      if (data?.payload?.success) {
        localStorage.setItem("authtoken", data?.payload?.token || "");
        localStorage.setItem("userRole", data?.payload?.user?.role || "");
        localStorage.setItem("userId", data?.payload?.user?.id || "");

        if (data?.payload?.user?.customer_id) {
          localStorage.setItem("customerId", data?.payload?.user?.customer_id);
        }

        setFormData({
          email: "",
          password: "",
          role: "staff",
        });
      } else {
        alert(data?.payload?.message);
      }
    });
  };

  const roleOptions = [
    { value: "staff", label: "Staff Member", icon: Briefcase },
    { value: "customer", label: "Pet Owner", icon: User },
  ]

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-secondary-50 px-4 py-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-secondary-100">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900">Welcome Back</h2>
          <p className="text-secondary-500 mt-1">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block mb-3 text-secondary-700 text-sm font-semibold">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col items-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 group ${formData.role === option.value
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-secondary-100 hover:border-primary-300 hover:bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={formData.role === option.value}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="sr-only"
                  />
                  <option.icon className={`w-6 h-6 mb-2 ${formData.role === option.value ? 'text-primary-600' : 'text-secondary-400 group-hover:text-primary-500'}`} />
                  <span className="text-xs font-semibold">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-secondary-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-secondary-900 placeholder:text-secondary-400"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
                <Mail size={18} />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-secondary-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-secondary-900 placeholder:text-secondary-400"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
                <Lock size={18} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.role || !formData.email || !formData.password}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-sm text-center text-secondary-500">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            Create Customer Account
          </a>
        </p>
      </div>
    </div>
  )
}
