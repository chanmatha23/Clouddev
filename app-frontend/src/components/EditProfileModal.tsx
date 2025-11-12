import React, { useState } from "react";
import ModalBase from "./ModalBase";

interface Profile {
  username: string;
  email: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onConfirm: (updatedProfile: Profile) => void; // ✅ ส่งข้อมูลกลับไปหน้า ProfilePage
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onConfirm,
}) => {
  // ✅ state สำหรับเก็บค่าที่แก้ไขในฟอร์ม
  const [formData, setFormData] = useState<Profile>({
    username: profile.username,
    email: profile.email,
  });

  if (!isOpen) return null;

  // ✅ handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle confirm
  const handleConfirm = () => {
    onConfirm(formData);
    onClose();
  };

  return (
    <ModalBase title="Edit Profile" onCancel={onClose} onConfirm={handleConfirm}>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Username :
          </label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-gray-100 text-black border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Email :
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 text-black border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>
    </ModalBase>
  );
};

export default EditProfileModal;
