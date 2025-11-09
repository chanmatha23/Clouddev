import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register!", { username, email, password, confirm, role });
    // TODO: validation + API call
    if (username && email && password && confirm && role) {
      navigate("/");
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="rounded-2xl shadow-xl w-full max-w-xl p-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create an account
        </h1>
        <p className="text-gray-300 text-sm mb-8">
          Already have an account?{" "}
          <button
            className="ml-1 underline hover:text-[#08CB00]"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </p>

        {/* Form */}
        <form className="space-y-6 text-left" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm text-white mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-md border bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-md border bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-md border bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-white mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-3 rounded-md border bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-white mb-1">Role</label>
            <div className="relative">
  <select
    className="w-full px-4 py-2 rounded-md border bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
        onChange={(e) => setRole(e.target.value)}

  >
    <option>Viewer</option>
    <option>Streamer</option>
  </select>
  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
</div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#08CB00] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
