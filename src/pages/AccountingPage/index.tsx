import { useState } from "react";
import { Pencil } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LayoutWrapper from "../../components/Layout";
import PromtpayLogo from "../../assets/Promtpay.png";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
} from "recharts";
import EditPhoneModal from "../../components/EditPhoneModal";

interface HistoryItem {
    username: string;
    amount: number;
    message: string;
    date: string;
    time: string;
    avatar: string;
}

const dailyDataMock: Record<
    string,
    {
        total: number;
        user: string;
        detail: { hour: string; amount: number }[];
        history: HistoryItem[];
    }
> = {
    "2025-09-18": {
        total: 200,
        user: "Chanmatha",
        detail: [
            { hour: "12 AM", amount: 30 },
            { hour: "3 AM", amount: 10 },
            { hour: "6 AM", amount: 50 },
            { hour: "9 AM", amount: 20 },
            { hour: "12 PM", amount: 40 },
            { hour: "3 PM", amount: 50 },
            { hour: "6 PM", amount: 0 },
            { hour: "9 PM", amount: 0 },
        ],
        history: [
            {
                username: "Alice",
                amount: 50,
                message: "Nice job!",
                date: "18 Sep 2025",
                time: "10:20",
                avatar: "https://i.pravatar.cc/40?img=3",
            },
            {
                username: "Bob",
                amount: 150,
                message: "Keep it up!",
                date: "18 Sep 2025",
                time: "14:15",
                avatar: "https://i.pravatar.cc/40?img=4",
            },
        ],
    },
    "2025-09-19": {
        total: 350,
        user: "Chanmatha",
        detail: [
            { hour: "12 AM", amount: 90 },
            { hour: "3 AM", amount: 20 },
            { hour: "6 AM", amount: 20 },
            { hour: "9 AM", amount: 80 },
            { hour: "12 PM", amount: 70 },
            { hour: "3 PM", amount: 0 },
            { hour: "6 PM", amount: 0 },
            { hour: "9 PM", amount: 0 },
        ],
        history: [
            {
                username: "Gina Kika",
                amount: 100,
                message: "Keep going! Big fan here!",
                date: "19 Sep 2025",
                time: "12:30",
                avatar: "https://i.pravatar.cc/40?img=1",
            },
            {
                username: "Ken Beba",
                amount: 200,
                message: "Cheering for you! Loving the vibes!",
                date: "19 Sep 2025",
                time: "11:50",
                avatar: "https://i.pravatar.cc/40?img=2",
            },
        ],
    },
    "2025-09-20": {
        total: 500,
        user: "Chanmatha",
        detail: [
            { hour: "12 AM", amount: 100 },
            { hour: "3 AM", amount: 50 },
            { hour: "6 AM", amount: 100 },
            { hour: "9 AM", amount: 100 },
            { hour: "12 PM", amount: 150 },
            { hour: "3 PM", amount: 0 },
            { hour: "6 PM", amount: 0 },
            { hour: "9 PM", amount: 0 },
        ],
        history: [
            {
                username: "Jane Doe",
                amount: 300,
                message: "So proud of you!",
                date: "20 Sep 2025",
                time: "09:40",
                avatar: "https://i.pravatar.cc/40?img=5",
            },
            {
                username: "Mike Chan",
                amount: 200,
                message: "Awesome stream!",
                date: "20 Sep 2025",
                time: "13:10",
                avatar: "https://i.pravatar.cc/40?img=6",
            },
        ],
    },
};

export default function AccountingPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date("2025-09-19")
    );

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    const key = formatDate(selectedDate);
    const dailyIncome = dailyDataMock[key] || {
        total: 0,
        user: "-",
        detail: [],
        history: [],
    };

    const [promptpay, setPromptPay] = useState("064-635-xxxx");
    const [isModalOpen, setModalOpen] = useState(false);

    const handleUpdatePromptPay = (updated: { promptpay: string }) => {
        setPromptPay(updated.promptpay);
        console.log("Updated PromptPay:", updated.promptpay);
    };
    const maskPromptpay = (number: string) => {
        if (!number) return "";
        if (number.length <= 4) return number; // ถ้าสั้นเกินไป ไม่ต้อง mask

        // ✅ ตัวอย่าง: 0891234567 → 089xxxxx67
        const start = number.slice(0, 3);
        const end = number.slice(-2);
        return `${start}xxxxx${end}`;
    };

    return (
        <LayoutWrapper>
            <h1 className="text-3xl font-bold mb-8">Accounting</h1>

            {/* Phone number + Edit */}
            <div className="flex items-center mb-6 gap-6">
                <img className="w-14 " src={PromtpayLogo}></img>
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        value={maskPromptpay(promptpay)}
                        readOnly
                        className="bg-black/40 w-full p-2 pr-8 rounded-md text-gray-200 outline-none"
                    />
                    <Pencil
                        onClick={() => setModalOpen(true)} // ✅ เปิด modal
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 cursor-pointer hover:text-white"
                    />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-gray-400">
                        Weekly Income{" "}
                        <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                            First
                        </span>
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        100 <span className="text-lg">Baht</span>
                    </h2>
                    <p className="text-green-400 mt-1">▲ 20%</p>
                </div>

                <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-gray-400">
                        Monthly Income{" "}
                        <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                            Sep
                        </span>
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        800 <span className="text-lg">Baht</span>
                    </h2>
                    <p className="text-green-400 mt-1">▲ 20%</p>
                </div>

                <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-gray-400">
                        Yearly Income{" "}
                        <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                            2025
                        </span>
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        10,000 <span className="text-lg">Baht</span>
                    </h2>
                    <p className="text-red-400 mt-1">▼ 0.5%</p>
                </div>
            </div>

            {/* Daily Income Overview */}
            <div className="bg-black/20 p-6 rounded-xl mb-8">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-300 font-semibold">
                        Daily Income Overview
                    </p>
                    <div className="bg-gray-700 px-2 py-1 rounded-md text-sm flex items-center gap-2">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="bg-transparent outline-none"
                            dateFormat="dd MMM yyyy"
                        />
                    </div>
                </div>

                {/* Chart */}
                <div className="h-64 w-full bg-black/40 rounded-lg p-2">
                    {dailyIncome.detail.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyIncome.detail}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#333"
                                />
                                <XAxis dataKey="hour" stroke="#ccc" />
                                <YAxis stroke="#ccc" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#111",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                    }}
                                />
                                <Bar
                                    dataKey="amount"
                                    fill="#22c55e"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-400 text-center mt-8">
                            No data available
                        </p>
                    )}
                </div>

                {/* Total + User */}
                <div className="flex items-center gap-3 mt-6">
                    <h2 className="text-4xl font-bold">
                        {dailyIncome.total}
                        <span className="text-lg ml-1">Baht</span>
                    </h2>
                    <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-lg font-semibold">
                        {dailyIncome.user}
                    </span>
                </div>
            </div>

            {/* History Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">History</h2>
                <div className="bg-black/30 rounded-xl p-6 space-y-3">
                    {dailyIncome.history.length > 0 ? (
                        dailyIncome.history.map((h, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-black/50 px-4 py-3 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={h.avatar}
                                        alt={h.username}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-green-400 font-semibold">
                                            {h.username}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {h.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-white">
                                        {h.amount} Baht
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                        {h.date} / {h.time}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">
                            No history available
                        </p>
                    )}
                </div>
            </div>
            <EditPhoneModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                promptpay={promptpay}
                onConfirm={handleUpdatePromptPay}
            />
        </LayoutWrapper>
    );
}
