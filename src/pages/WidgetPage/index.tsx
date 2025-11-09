import { useEffect, useState } from "react";
import { Copy, Globe } from "lucide-react";
import LayoutWrapper from "../../components/Layout";

export default function WidgetPage() {
  const [donorName, setDonorName] = useState("PillowSis");
  const [amount, setAmount] = useState("1000");
  const [message, setMessage] = useState("Donate testing");
  const [color, setColor] = useState("#22c55e");

  const [imageUrl, setImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/616/616408.png"
  );

  // ✅ แทนที่จะ fix url → generate ตาม domain ปัจจุบัน
  const [widgetUrl, setWidgetUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidgetUrl(`${window.location.origin}/overlay`);
    }
  }, []);

  const copyToClipboard = () => {
    if (!widgetUrl) return;
    navigator.clipboard.writeText(widgetUrl);
    alert("Copied widget URL!");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleTest = () => {
    const payload = {
      user: donorName,
      amount,
      message,
      color,
      imageUrl,
    };

    // ส่งไป overlay
    const channel = new BroadcastChannel("widget-test");
    channel.postMessage(payload);
    channel.close();
  };

  return (
    <LayoutWrapper>
      <h1 className="text-3xl font-bold mb-8">My Widget</h1>

      {/* Widget URL */}
      <div className="flex items-center bg-black/40 rounded-lg px-4 py-3 mb-6 justify-between">
        <span className="truncate">{widgetUrl || "Loading..."}</span>
        <button
          onClick={copyToClipboard}
          disabled={!widgetUrl}
          className="bg-[#08CB00] text-black px-4 py-1 rounded-md flex items-center gap-2 hover:bg-green-400 disabled:opacity-50"
        >
          <Copy className="w-4 h-4" /> Copy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="rounded-xl flex flex-col items-center justify-center">
          <div className="bg-black/40 w-full h-[40vh] flex flex-col items-center justify-center rounded-lg mb-4 p-6 text-center">
            <img src={imageUrl} className="w-20 h-20 mb-2" alt="donation" />
            <p className="text-xl">
              <span className="text-2xl" style={{ color }}>{donorName}</span> donated{" "}
              <span className="text-2xl" style={{ color }}>{amount}</span> baht.
            </p>
            <p className="text-xl text-gray-300">{message}</p>
          </div>

          {/* Test Box */}
          <div className="bg-black/40 w-full p-6 rounded-lg relative h-[20vh]">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 font-semibold">Test notification</p>
              <button
                onClick={handleTest}
                className="bg-gray-200 text-black px-4 py-1 rounded-lg flex items-center gap-2 hover:bg-gray-300"
              >
                <Globe className="w-4 h-4" /> Test
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mt-5">
              <div>
                <p className="text-gray-400 text-sm">Donor's name</p>
                <p className="font-bold">{donorName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Amount</p>
                <p className="font-bold">{amount}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Message</p>
                <p className="font-bold">{message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-black/40 rounded-xl p-6 space-y-6">
          {/* Upload Image */}
          <div className="border-2 border-dashed border-gray-500 rounded-lg h-40 flex flex-col items-center justify-center">
            <label className="text-gray-400 cursor-pointer">
              Click or drag to upload an image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
            {imageUrl && (
              <img src={imageUrl} alt="preview" className="w-20 h-20 mt-2" />
            )}
          </div>

          {/* Donor Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Donor's name
            </label>
            <input
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full bg-black/30 border border-gray-500 rounded-md px-3 py-2 text-white"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black/30 border border-gray-500 rounded-md px-3 py-2 text-white"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Message</label>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/30 border border-gray-500 rounded-md px-3 py-2 text-white"
            />
          </div>

          {/* Message Color */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Message Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 rounded border border-gray-500"
            />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
