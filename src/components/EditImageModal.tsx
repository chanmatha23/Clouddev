import React, { useRef, useState } from "react";
import ModalBase from "./ModalBase";
import { Upload, Image as ImageIcon } from "lucide-react";

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl: string;
  onConfirm: (newAvatar: string) => void; // ✅ ส่งรูปใหม่กลับไปยัง ProfilePage
}

const EditImageModal: React.FC<EditImageModalProps> = ({
  isOpen,
  onClose,
  avatarUrl,
  onConfirm,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(avatarUrl);

  if (!isOpen) return null;

  // ✅ handle เมื่อเลือกไฟล์
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ handle drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // ✅ กดยืนยัน
  const handleConfirm = () => {
    onConfirm(preview);
    onClose();
  };

  return (
    <ModalBase title="Edit Image" onCancel={onClose} onConfirm={handleConfirm}>
      <div
        className="flex flex-col items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div
          className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 mb-4 cursor-pointer relative"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gray-100">
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-400">No Image</span>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1">
            <Upload className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="text-gray-500 text-sm text-center">
          Click or drag to upload image (JPG, PNG, GIF)
        </p>
      </div>
    </ModalBase>
  );
};

export default EditImageModal;
