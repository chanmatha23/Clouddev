import { useState } from "react";
import LayoutWrapper from "../../components/Layout";
import { X, Check } from "lucide-react";

export default function DonatePage() {
  const [amount, setAmount] = useState("100");
  const [message, setMessage] = useState("Keep going! Big fan here!");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const handleDonate = () => {
    alert("✅ Donation confirmed!");
  };

  const handleCancel = () => {
    alert("❌ Donation cancelled.");
  };


  return (
    <LayoutWrapper>
      <div className="flex flex-col items-center justify-center text-white">
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl mt-10">
          {/* Left: QR + Avatar */}
          <div className="flex flex-col items-center bg-black/30 rounded-2xl p-8">
                  <h1 className="text-4xl font-bold text-[#22c55e] mb-8">
          <span className="text-white">Donate to </span> Tenz
        </h1>
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <img src="https://www.theodoostore.com/web/image/app/9533/app_icon"></img>
              {/* Avatar ตรงกลาง QR */}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-black/30 rounded-2xl p-8 space-y-6">
            {/* Upload image */}
            <div>
              <label className="text-gray-300 font-semibold mb-2 block">
                Image
              </label>
              <div className="border-2 border-dashed border-gray-500 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer">
                <label className="text-gray-400 cursor-pointer text-center">
                  Click or drag to upload an image.
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="preview"
                    className="w-20 h-20 rounded-md mt-3"
                  />
                )}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-gray-300 block mb-1 font-semibold">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/50 w-full rounded-md px-3 py-2 text-white border border-gray-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-gray-300 block mb-1 font-semibold">
                Message
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black/50 w-full rounded-md px-3 py-2 text-white border border-gray-500"
              />
            </div>

          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8 mx-auto">
              <button
                          onClick={handleCancel}
                          className="bg-white text-red-600 px-5 rounded-lg hover:bg-red-200 w-full flex justify-center items-center h-10 gap-4 text-lg"
                        >
                          <X className="" />
                          Cancel
                        </button>
              <button
                          onClick={handleDonate}
                          className="bg-[#08CB00] text-white px-5 rounded-lg w-full flex justify-center items-center h-10 gap-4 text-l"
                        >
                          <Check className="text-white w-6 h-6" />
                          Confirm
                        </button>
            </div>
      </div>
    </LayoutWrapper>
  );
}
