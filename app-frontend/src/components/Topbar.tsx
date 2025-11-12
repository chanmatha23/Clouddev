import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { BarChart3, Sliders, User, Wallet, Gift, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const { role } = JSON.parse(userData);
        setUserRole(role);
      } catch {
        // ถ้า JSON พังหรือไม่ถูก format ให้ logout ทิ้ง
        localStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onToggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 🎯 เมนูแยกตาม role
  const menuByRole = {
    streamer: [
      { name: "Dashboard", icon: BarChart3, path: "/dashboard/streamer" },
      { name: "User Profile", icon: User, path: "/profile" },
      { name: "Accounting", icon: Wallet, path: "/accounting" },
      { name: "Edit Widget", icon: Sliders, path: "/widget" },
    ],
    donor: [
      { name: "Dashboard", icon: BarChart3, path: "/dashboard/donor" },
      { name: "History", icon: Gift, path: "/donation-history" },
    ],
  } as const;

  const menuItems =
    (userRole && menuByRole[userRole as keyof typeof menuByRole]) || [];

  // 🧭 ถ้ายังโหลด role ไม่เสร็จ ให้แสดง loading
  if (!userRole) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 flex items-center justify-center text-white">
        Loading sidebar...
      </div>
    );
  }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-72`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Logo */}
                    <div
                        className="flex items-center font-bold text-2xl mb-4 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img
                            className="ml-[-13%] w-24 object-contain"
                            src={logo}
                            alt="Logo"
                            onClick={() => navigate("/")}
                        />
                        <span className="text-white whitespace-nowrap">
                            Stream Boost
                        </span>
                    </div>

                    {/* Menu List */}
                    <ul className="flex flex-col gap-1 text-gray-700 bg-white/10 backdrop-blur-xl h-[79vh] p-4 rounded-xl">
                        {menuItems.map(({ name, icon: Icon, path }) => {
                            const isActive = location.pathname === path;
                            return (
                                <li key={path}>
                                    <button
                                        onClick={() => navigate(path)}
                                        className={`flex items-center gap-2 p-3 rounded-xl mx-auto w-full font-medium text-lg transition-all 
                      ${
                          isActive
                              ? "bg-[#253900] text-white"
                              : "text-white hover:bg-[#253900]/60"
                      }`}
                                    >
                                        <Icon className="w-6 h-6 mr-2 ml-2" />
                                        <span className="whitespace-nowrap">
                                            {name}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Logout */}
                    <div className="mt-auto">
                        <button
                            onClick={handleLogout}
                            className="bg-red-900/50 hover:bg-red-700 text-white px-5 py-3 rounded-lg w-full flex items-center justify-center transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Button (Mobile) */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={onToggleSidebar}>
                    {isOpen ? "❌" : <Menu className="w-6 h-6 text-white" />}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
