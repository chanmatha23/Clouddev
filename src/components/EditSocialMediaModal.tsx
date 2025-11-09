import React, { useState } from "react";
import ModalBase from "./ModalBase";

interface SocialMediaItem {
  name: string;
  username: string;
}

interface EditSocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  socialMedia: SocialMediaItem[];
  onConfirm: (updatedSocialMedia: SocialMediaItem[]) => void; // ✅ ส่งข้อมูลกลับไปยัง ProfilePage
}

const EditSocialMediaModal: React.FC<EditSocialMediaModalProps> = ({
  isOpen,
  onClose,
  socialMedia,
  onConfirm,
}) => {
  const [formData, setFormData] = useState<SocialMediaItem[]>(socialMedia);

  if (!isOpen) return null;

  // ✅ handle input change
  const handleChange = (index: number, value: string) => {
    const updated = [...formData];
    updated[index].username = value;
    setFormData(updated);
  };

  // ✅ confirm update
  const handleConfirm = () => {
    onConfirm(formData);
    onClose();
  };

  return (
    <ModalBase title="Edit Social Media" onCancel={onClose} onConfirm={handleConfirm}>
      <div className="space-y-3">
        {formData.map((item, i) => (
          <div key={i} className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">
              {item.name} :
            </label>
            <input
              type="text"
              value={item.username}
              onChange={(e) => handleChange(i, e.target.value)}
              className="bg-gray-100 text-black border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}
      </div>
    </ModalBase>
  );
};

export default EditSocialMediaModal;
