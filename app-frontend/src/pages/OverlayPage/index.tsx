import { useEffect, useState } from "react";

interface Donation {
  user: string;
  amount: string;
  message: string;
  color: string;
  imageUrl: string;
}

export default function OverlayPage() {
  const [donation, setDonation] = useState<Donation | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("widget-test");
    channel.onmessage = (ev) => {
      setDonation(ev.data);
      setTimeout(() => setDonation(null), 8000);
    };
    return () => channel.close();
  }, []);

  if (!donation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="rounded-xl p-6 text-center text-white animate-fade-in-out">
        <img src={donation.imageUrl} className="w-24 h-24 mx-auto mb-3" />
        <p className="text-xl">
          <span className="text-2xl" style={{ color: donation.color }}>{donation.user}</span> donated{" "}
          <span className="text-2xl" style={{ color: donation.color }}>{donation.amount}</span> baht.
        </p>
        <p className="text-lg mt-2 text-gray-200">{donation.message}</p>
      </div>
    </div>
  );
}
