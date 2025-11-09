import React from "react";
import Sidebar from "./Topbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden" style={{
                background: "linear-gradient(135deg, #253900 29%, #000000 64%)",
            }}>
      {/* Sidebar (ซ้าย) */}
      <Sidebar />

      {/* Content (ขวา) */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-64 mt-18">
        <div className="flex-1 flex items-center justify-center px-6 md:px-10">
          {/* กล่อง content */}
          <div className="w-full max-w-[86rem] h-[87vh] bg-white/20 backdrop-blur-xl p-6 rounded-xl text-white overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutWrapper;
