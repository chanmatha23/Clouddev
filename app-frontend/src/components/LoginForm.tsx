import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    // 🧠 mock users
    const mockUsers = [
      { username: "streamer", password: "1234", role: "streamer" },
      { username: "donor", password: "1234", role: "donor" },
    ];

    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // เก็บข้อมูลใน localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ username: foundUser.username, role: foundUser.role })
      );

      // Redirect ตาม role
      if (foundUser.role === "admin") {
        navigate("/dashboard/streamer");
      } else {
        navigate("/");
      }
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

    return (
        <div className="w-full flex items-center justify-center h-screen">
            {/* กล่อง login */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl w-full p-[20%] h-[95%]">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-white mb-1">
                    Welcome Back!
                </h1>
                <h2 className="text-xl font-semibold text-[#08CB00] mb-6">
                    Stream Boost
                </h2>
                <p className="text-gray-300 text-sm mb-8">
                    Sign in to manage your donations and track the impact of
                    your support.
                </p>

                {/* Form */}
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm text-white mb-1">
                            Username/Email
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md border bg-white text-[#888888] focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username or email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                className="w-full px-4 py-2 rounded-md border bg-white text-[#888888] focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() => setShow(!show)}
                            >
                                {show ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <div className="text-right mt-2">
                            <a
                                href="#"
                                className="text-sm text-white hover:text-[#08CB00] transition"
                            >
                                Forget Password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#08CB00] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
