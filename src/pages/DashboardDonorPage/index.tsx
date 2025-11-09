import { useState } from "react";
import LayoutWrapper from "../../components/Layout";
import { Edit2, UserRoundCheck } from "lucide-react";
import EditProfileModal from "../../components/EditProfileModal";
import EditImageModal from "../../components/EditImageModal";

// ✅ กำหนด type กลางให้ชัดเจน
interface Profile {
  username: string;
  email: string;
  joinedDate: string;
  avatar: string;
}

export default function DashboardDonor() {
  // 🧠 Mock profile data
  const [profile, setProfile] = useState<Profile>({
    username: "Username Donor",
    email: "user@gmail.com",
    joinedDate: "25 Sep 2025",
    avatar: "https://i.pravatar.cc/150?img=32",
  });

  // 📦 Modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const donations = [
    { streamer: "Tenz", amount: 1500, date: "10:00 2 Oct 2025" },
    { streamer: "Tenz", amount: 1500, date: "10:00 2 Oct 2025" },
    { streamer: "Tenz", amount: 1500, date: "10:00 2 Oct 2025" },
    { streamer: "Tenz", amount: 1500, date: "10:00 2 Oct 2025" },
    { streamer: "Tenz", amount: 1500, date: "10:00 2 Oct 2025" },
  ];

  return (
    <LayoutWrapper>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-black/50 p-6 rounded-xl">
          <p className="text-[#858585] text-lg mb-2">Total Donations</p>
          <h2 className="text-4xl font-bold text-white">
            8,000 <span className="text-lg font-normal">Baht</span>
          </h2>
        </div>
        <div className="bg-black/50 p-6 rounded-xl">
          <p className="text-[#858585] text-lg mb-2">Donation Count</p>
          <h2 className="text-4xl font-bold text-white">
            25 <span className="text-lg font-normal">times</span>
          </h2>
        </div>
        <div className="bg-black/50 p-6 rounded-xl">
          <p className="text-[#858585] text-lg mb-2">Last Donation</p>
          <div className="flex items-baseline justify-between">
            <h2 className="text-4xl font-bold text-white">
              120 <span className="text-lg font-normal">Baht</span>
            </h2>
            <span className="text-gray-700 text-xs bg-[#858585] px-3 py-1 rounded-lg">
              2 Oct 2025
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile */}
        <div className="md:col-span-2 bg-black/30 rounded-xl p-6 flex flex-col items-center">
          <p className="text-gray-300 mb-3 self-start">User Profile</p>

          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover"
            />
            <button
              onClick={() => setShowImageModal(true)}
              className="absolute bottom-2 right-2 bg-white text-black p-2 rounded-full transition-all hover:bg-gray-200"
            >
              <Edit2 size={18} />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-black/50 h-full w-full mt-6 rounded-lg p-4">
            {/* Header + edit button */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-semibold text-white">
                {profile.username}
              </h3>
              <button
                onClick={() => setShowProfileModal(true)}
                className="bg-white text-black p-2 rounded-full transition-all hover:bg-gray-200"
              >
                <Edit2 size={18} />
              </button>
            </div>

            <div className="flex items-center text-gray-300 text-lg mb-1">
              <img
                className="w-10 mr-3 ml-3"
                src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"
                alt="Gmail logo"
              />
              {profile.email}
            </div>

            <div className="flex items-center text-gray-300 text-lg mb-1 ">
              <UserRoundCheck className="w-10 mr-3 ml-3 text-white" />
              {profile.joinedDate}
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="bg-black/30 rounded-xl p-6">
          <p className="text-gray-300 mb-3">Donation History</p>
          <div className="flex flex-col gap-3">
            {donations.map((item, index) => (
              <div
                key={index}
                className="bg-black/30 p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-white font-semibold">
                    {item.streamer}
                  </span>
                  <span className="text-lg font-bold">
                    {item.amount.toLocaleString()}{" "}
                    <span className="text-sm text-gray-300">Baht</span>
                  </span>
                </div>
                <span className="text-gray-400 text-xs">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modals */}
      <EditProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        // ✅ ใช้ Partial เพื่อรองรับข้อมูลที่เปลี่ยนบางส่วน
        onConfirm={(updatedProfile: Partial<Profile>) => {
          setProfile((prev) => ({ ...prev, ...updatedProfile }));
          setShowProfileModal(false);
          console.log("✅ Updated profile:", updatedProfile);
        }}
      />

      <EditImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        avatarUrl={profile.avatar}
        onConfirm={(newAvatar: string) => {
          setProfile((prev) => ({ ...prev, avatar: newAvatar }));
          setShowImageModal(false);
          console.log("🖼️ New avatar URL:", newAvatar);
        }}
      />
    </LayoutWrapper>
  );
}
