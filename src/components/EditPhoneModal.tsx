import React, { useState } from "react";
import ModalBase from "./ModalBase";

interface PromptPayData {
  promptpay: string;
}

interface EditPromptPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptpay: string; // ค่า PromptPay ปัจจุบัน
  onConfirm: (updated: PromptPayData) => void;
}

const EditPromptPayModal: React.FC<EditPromptPayModalProps> = ({
  isOpen,
  onClose,
  promptpay,
  onConfirm,
}) => {
  const [id, setId] = useState(promptpay);
  const [confirmId, setConfirmId] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (id.trim() === "" || confirmId.trim() === "") {
      setError("กรุณากรอก PromptPay ID ทั้งสองช่อง");
      return;
    }
    if (id !== confirmId) {
      setError("PromptPay ID ไม่ตรงกัน");
      return;
    }
    onConfirm({ promptpay: id });
    onClose();
  };

  return (
    <ModalBase
      title="Edit PromptPay ID"
      onCancel={onClose}
      onConfirm={handleConfirm}
    >
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            PromptPay ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full bg-gray-100 text-black border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="เช่น 064-xxx-xxxx หรือเลขบัตรประชาชน"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            PromptPay ID again <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={confirmId}
            onChange={(e) => setConfirmId(e.target.value)}
            className="w-full bg-gray-100 text-black border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="กรอกซ้ำอีกครั้ง"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </ModalBase>
  );
};

export default EditPromptPayModal;
