

import { useState } from "react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.role) {
      alert("Please select your role")
      return
    }

    // Handle login logic here
    console.log("Login data:", formData)
    alert("Login functionality would be implemented here")
  }

  const roleOptions = [
    { value: "staff", label: "Staff Member", icon: "👨‍⚕️" },
    { value: "customer", label: "Pet Owner", icon: "🐾" },
  ]

  return (
  <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#DFD0B8] to-white px-4 py-6">
  <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-[#948979]/30">
    
    {/* Header */}
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold text-[#222831]">Login</h2>
      <p className="text-sm text-[#393E46]">Welcome Back!</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {/* Role Selection */}
      <div>
        <label className="block mb-2 text-[#393E46] text-sm font-medium">Login As</label>
        <div className="grid grid-cols-2 gap-2">
          {roleOptions.map((option) => (
            <label
              key={option.value}
              className={`flex flex-col items-center p-3 border-2 rounded-md cursor-pointer transition-all text-sm ${
                formData.role === option.value
                  ? "border-[#948979] bg-[#DFD0B8] text-[#222831]"
                  : "border-gray-300 hover:border-[#948979] hover:bg-[#DFD0B8]/30"
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
              <div className="text-xl mb-1">{option.icon}</div>
              <div>{option.label}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block mb-1 text-[#393E46]">Email</label>
        <div className="relative">
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 pl-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#948979] bg-[#DFD0B8]/30 text-[#222831] border-gray-300"
            required
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#948979]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block mb-1 text-[#393E46]">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 pl-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#948979] bg-[#DFD0B8]/30 text-[#222831] border-gray-300"
            required
          />
           <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#948979]"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#948979]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formData.role || !formData.email || !formData.password}
        className="w-full py-2 bg-[#222831] text-white rounded-md font-semibold hover:bg-[#393E46] transition-all disabled:opacity-60"
      >
        Login
      </button>
    </form>

    {/* Signup Link */}
    <p className="mt-4 text-xs text-center text-[#393E46]">
      Don’t have an account?{" "}
      <a href="/signup" className="text-[#222831] font-medium underline hover:text-[#948979]">
        Sign up as Customer
      </a>
    </p>
  </div>
</div>

  )
}
