import { useState } from "react";
import LayoutWrapper from "../../components/Layout";
import { X, Check } from "lucide-react";

export default function DonatePage() {
  const [amount, setAmount] = useState("300");
  const [donor_name, setdonor_name] = useState("ชินจัง");
  const [message, setMessage] = useState("แจก300");
  const [loading, setLoading] = useState(false);

  const API_GATEWAY = "https://dojfcue4bg.execute-api.us-east-1.amazonaws.com/donate";
  const STREAMER_ID = "2c00bedc-b038-4b71-b53b-019af9367ae6";

  const handleDonate = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_GATEWAY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamer_id: STREAMER_ID,
          donor_name,
          message,
          amount: parseFloat(amount),
        }),
      });

      alert(`✅ Donation success`);
    } catch (err) {
      alert("❌ Donation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAmount("300");
    setMessage("แจก300");
    setdonor_name("ชินจัง")
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl mt-10">
          {/* Left */}
          <div className="flex flex-col items-center bg-black/30 rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-[#22c55e] mb-8">
              <span className="text-white">Donate to </span>Tenz
            </h1>
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <img src="https://www.theodoostore.com/web/image/app/9533/app_icon" />
            </div>
          </div>

          {/* Right */}
          <div className="bg-black/30 rounded-2xl p-8 space-y-6">
            <div>
              <label className="text-gray-300 block mb-1 font-semibold">Donor Name</label>
              <input
                type="text"
                value={donor_name}
                onChange={(e) => setdonor_name(e.target.value)}
                className="bg-black/50 w-full rounded-md px-3 py-2 text-white border border-gray-500"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1 font-semibold">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/50 w-full rounded-md px-3 py-2 text-white border border-gray-500"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1 font-semibold">Message</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black/50 w-full rounded-md px-3 py-2 text-white border border-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 mx-auto w-full max-w-5xl">
          <button
            onClick={handleCancel}
            className="bg-white text-red-600 px-5 rounded-lg hover:bg-red-200 w-full flex justify-center items-center h-10 gap-4 text-lg"
            disabled={loading}
          >
            <X /> Cancel
          </button>
          <button
            onClick={handleDonate}
            className="bg-[#08CB00] text-white px-5 rounded-lg w-full flex justify-center items-center h-10 gap-4 text-lg"
            disabled={loading}
          >
            <Check className="text-white w-6 h-6" />
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
