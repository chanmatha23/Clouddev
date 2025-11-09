import LayoutWrapper from "../../components/Layout";

export default function DonationHistoryPage() {
  const donations = [
    {
      username: "Tenz",
      amount: 100,
      message: "Keep going! Big fan here!",
      date: "19 Sep 2025 / 12:30",
      avatar: "https://i.pravatar.cc/50?img=11",
    },
    {
      username: "Ken Beba",
      amount: 200,
      message: "Cheering for you! Loving the vibes!",
      date: "19 Sep 2025 / 11:50",
      avatar: "https://i.pravatar.cc/50?img=12",
    },
    {
      username: "Tenz",
      amount: 100,
      message: "Keep going! Big fan here!",
      date: "19 Sep 2025 / 12:30",
      avatar: "https://i.pravatar.cc/50?img=13",
    },
    {
      username: "Ken Beba",
      amount: 200,
      message: "Cheering for you! Loving the vibes!",
      date: "19 Sep 2025 / 11:50",
      avatar: "https://i.pravatar.cc/50?img=14",
    },
    {
      username: "Tenz",
      amount: 100,
      message: "Keep going! Big fan here!",
      date: "19 Sep 2025 / 12:30",
      avatar: "https://i.pravatar.cc/50?img=15",
    },
    {
      username: "Ken Beba",
      amount: 200,
      message: "Cheering for you! Loving the vibes!",
      date: "19 Sep 2025 / 11:50",
      avatar: "https://i.pravatar.cc/50?img=16",
    },
  ];

  return (
    <LayoutWrapper>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-white">Donation History</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Today */}
        <div className="bg-black/50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-[#858585] text-lg">Total Donations</p>
            <span className="bg-[#858585]/30 text-xs px-3 py-1 rounded-md text-gray-300">
              Today
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-2">
            250 <span className="text-lg font-normal">Baht</span>
          </h2>
        </div>

        {/* Month */}
        <div className="bg-black/50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-[#858585] text-lg">Total Donations</p>
            <span className="bg-[#858585]/30 text-xs px-3 py-1 rounded-md text-gray-300">
              Month
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-2">
            1,000 <span className="text-lg font-normal">Baht</span>
          </h2>
        </div>

        {/* Year */}
        <div className="bg-black/50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-[#858585] text-lg">Total Donations</p>
            <span className="bg-[#858585]/30 text-xs px-3 py-1 rounded-md text-gray-300">
              Year
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-2">
            8,000 <span className="text-lg font-normal">Baht</span>
          </h2>
        </div>
      </div>

      {/* History Section */}
      <h2 className="text-2xl font-bold mb-4 text-white">History</h2>

      {/* Table */}
      <div className="bg-black/40 rounded-xl p-6">
        {/* Table Header */}
        <div className="grid grid-cols-4 text-gray-400 font-semibold mb-4">
          <div>Username</div>
          <div>Amount</div>
          <div>Message</div>
          <div className="text-right">Date/Time</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col gap-3">
          {donations.map((donor, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center bg-black/20 rounded-lg p-3"
            >
              {/* Username */}
              <div className="flex items-center gap-3">
                <img
                  src={donor.avatar}
                  alt={donor.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-green-400 font-semibold">{donor.username}</span>
              </div>

              {/* Amount */}
              <div className="text-white font-semibold">
                {donor.amount} <span className="text-gray-400">฿</span>
              </div>

              {/* Message */}
              <div className="text-gray-300 truncate">{donor.message}</div>

              {/* Date/Time */}
              <div className="text-right text-gray-400 text-sm">{donor.date}</div>
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
}
