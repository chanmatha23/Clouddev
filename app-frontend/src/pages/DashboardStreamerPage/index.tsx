import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import LayoutWrapper from "../../components/Layout"; // ✅ import LayoutWrapper

export default function DashboardPage() {
    // --- Mock Data ---
    const [period, setPeriod] = useState("weekly");

    const weeklyData = [
        { name: "Week 1", value: 100 },
        { name: "Week 2", value: 220 },
        { name: "Week 3", value: 400 },
        { name: "Week 4", value: 1000 },
    ];

    const monthlyData = [
        { name: "Jan", value: 100 },
        { name: "Feb", value: 220 },
        { name: "Mar", value: 400 },
        { name: "Apr", value: 100 },
        { name: "May", value: 220 },
        { name: "Jun", value: 400 },
        { name: "Jul", value: 100 },
        { name: "Aug", value: 1000 },
        { name: "Sep", value: 220 },
        { name: "Oct", value: 100 },
        { name: "Nov", value: 220 },
        { name: "Dec", value: 400 },
    ];

    const yearlyData = [
        { name: "2020", value: 3200 },
        { name: "2021", value: 4000 },
        { name: "2022", value: 5000 },
        { name: "2023", value: 6000 },
        { name: "2024", value: 8000 },
    ];

    const donors = [
        {
            name: "John Mama",
            amount: 1500,
            img: "https://i.pravatar.cc/40?img=1",
        },
        {
            name: "Gina Kika",
            amount: 1200,
            img: "https://i.pravatar.cc/40?img=2",
        },
        {
            name: "Geko kaka",
            amount: 1000,
            img: "https://i.pravatar.cc/40?img=3",
        },
        {
            name: "Jenny Kim",
            amount: 850,
            img: "https://i.pravatar.cc/40?img=4",
        },
        {
            name: "Hela Joja",
            amount: 500,
            img: "https://i.pravatar.cc/40?img=5",
        },
    ];

    const getData = () => {
        if (period === "weekly") return weeklyData;
        if (period === "monthly") return monthlyData;
        return yearlyData;
    };

    return (
        <LayoutWrapper>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg text-sm">
                        <span className="text-gray-300">
                            https:// (Link Donate)
                        </span>
                        <button className="bg-green-500 text-black px-3 py-1 rounded-md font-medium">
                            Copy
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/50 p-6 rounded-xl">
                        <p className="text-gray-400">
                            Total Income{" "}
                            <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                                Today
                            </span>
                        </p>
                        <h2 className="text-3xl font-bold mt-2">
                            350 <span className="text-lg">Baht</span>
                        </h2>
                        <p className="text-green-400 mt-1">▲ 20 %</p>
                    </div>

                    <div className="bg-black/50 p-6 rounded-xl">
                        <p className="text-gray-400">
                            Total Income{" "}
                            <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                                All
                            </span>
                        </p>
                        <h2 className="text-3xl font-bold mt-2">
                            8,000 <span className="text-lg">Baht</span>
                        </h2>
                        <p className="text-red-400 mt-1">▼ 0.5 %</p>
                    </div>

                    <div className="bg-black/50 p-6 rounded-xl">
                        <p className="text-gray-400">
                            Donor count{" "}
                            <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                                All
                            </span>
                        </p>
                        <h2 className="text-3xl font-bold mt-2">
                            120 <span className="text-lg">donors</span>
                        </h2>
                        <p className="text-green-400 mt-1">▲ 0.5 %</p>
                    </div>
                </div>

                {/* Income Overview + Top Donors */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Income Overview */}
                    <div className="bg-black/20 h-[57vh] p-6 rounded-xl lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-400">Income Overview</p>
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="bg-gray-700 rounded-md px-2 py-1 text-sm"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>

                        <h2 className="text-2xl font-bold mb-4">
                            6,000 <span className="text-sm">Baht</span>{" "}
                            <span className="text-red-400 text-sm">
                                ▼ 1.23 %
                            </span>
                        </h2>

                        {/* Chart */}
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getData()}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#333"
                                    />
                                    <XAxis dataKey="name" stroke="#ccc" />
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
                                        dataKey="value"
                                        fill="#22c55e"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Donors */}
                    <div className="bg-black/20 p-6 rounded-xl">
                        <p className="text-gray-400 mb-4">Top Donors</p>
                        <div className="flex flex-col gap-4">
                            {donors.map((d, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between bg-black/50 p-3 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={d.img}
                                            alt={d.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm text-[#D9D9D9]">
                                                {d.name}
                                            </span>
                                            <span className="font-bold text-md">
                                                {d.amount}{" "}
                                                <span className="text-sm text-[#D9D9D9]">
                                                    Baht
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
         </LayoutWrapper>
    );
}
