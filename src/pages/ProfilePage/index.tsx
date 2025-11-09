import { useState } from "react";
import { Pencil, UserCheck } from "lucide-react";
import LayoutWrapper from "../../components/Layout"; // ✅ import LayoutWrapper
import EditProfileModal from "../../components/EditProfileModal";
import EditImageModal from "../../components/EditImageModal";
import EditSocialMediaModal from "../../components/EditSocialMediaModal";

export default function ProfilePage() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  const profile = {
    username: "IShowSpeed",
    email: "speedofficial@gmail.com",
    joinDate: "21 Jan 2016",
    avatar:
      "https://i.ytimg.com/vi/t_npca6fskA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDY7VG8Fl67sbl_DYS5l0HaYcgSJg",
  };

  const socialMedia = [
    {
      name: "YouTube",
      username: "@IShowSpeed",
      color: "#FF0000",
      icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    },
    {
      name: "Instagram",
      username: "@ishowspeed",
      color: "#E4405F",
      icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    },
    {
      name: "TikTok",
      username: "@ishowspeed",
      color: "#000000",
      icon: "https://cdn-icons-png.flaticon.com/128/4782/4782345.png",
    },
    {
      name: "Twitch",
      username: "ishowspeedlive",
      color: "#9146FF",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968819.png",
    },
    {
      name: "X (Twitter)",
      username: "@ishowspeedsui",
      color: "#000000",
      icon: "https://cdn-icons-png.flaticon.com/128/5969/5969020.png",
    },
    {
      name: "Facebook",
      username: "IShowSpeedOfficial",
      color: "#1877F2",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    },
  ];

  return (
    <LayoutWrapper>
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {/* Profile Info */}
        <div className="flex flex-col lg:flex-row gap-16 items-center relative">
          <div className="bg-black/50 p-10 rounded-xl w-full lg:w-[65%] relative">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => setShowProfileModal(true)}
            >
              <Pencil className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4">{profile.username}</h2>
            <div className="flex flex-col gap-3 text-gray-300">
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/15047/15047587.png"
                  alt="gmail"
                  className="w-10 h-10"
                />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 ml-1">
                <UserCheck className="w-8 h-8 text-white" />
                <span>{profile.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-64 h-64 rounded-full object-cover"
            />
            <button
              className="absolute bottom-3 right-3 bg-black/70 p-2 rounded-full hover:bg-black/90"
              onClick={() => setShowImageModal(true)}
            >
              <Pencil className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Social media</h2>
          <div className="bg-black/20 p-10 rounded-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => setShowSocialModal(true)}
            >
              <Pencil className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialMedia.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.icon}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="bg-black/30 w-full py-3 px-4 rounded-lg">
                    {item.username}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        onConfirm={(updatedProfile) =>
          console.log("✅ Updated profile:", updatedProfile)
        }
      />
      <EditImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        avatarUrl={profile.avatar}
        onConfirm={(newAvatar) =>
          console.log("New avatar URL:", newAvatar)
        }
      />
      <EditSocialMediaModal
        isOpen={showSocialModal}
        onClose={() => setShowSocialModal(false)}
        socialMedia={socialMedia}
        onConfirm={(updatedList) =>
          console.log("✅ Updated social media:", updatedList)
        }
      />
    </LayoutWrapper>
  );
}
