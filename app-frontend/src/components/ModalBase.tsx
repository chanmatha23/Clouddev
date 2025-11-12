import { Check, X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

interface ModalBaseProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  title,
  children,
  onCancel,
  onConfirm,
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white/95 text-black rounded-xl p-6 w-[90%] max-w-md shadow-lg z-50">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-between mt-6 gap-6">
          <button
            onClick={onCancel}
            className="bg-white text-red-600 px-5 rounded-lg hover:bg-red-200 w-[40%] flex justify-center items-center h-10 gap-4 text-lg"
          >
            <X className="text-red-600 w-6 h-6" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#08CB00] text-white w-[60%] h-10 rounded-lg flex justify-center items-center gap-4 text-lg"
          >
            <Check className="text-white w-6 h-6" />
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body // 👈 ส่ง modal ไป render ที่ <body>
  );
};

export default ModalBase;
