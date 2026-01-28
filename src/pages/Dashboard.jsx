import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import { getTaskStats } from "../services/taskService";
import StatCard from "../components/StatCard";
import Spinner from "../components/Spinner";
import PageTransition from "../components/PageTransition";
import AnimatedPageHeader from "../components/AnimatedPageHeader";
import { useTheme } from "../context/ThemeContext"
import ProgressRow from "../components/ProgressRow";

const Dashboard = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [is375, setIs375] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            setIs375(window.innerWidth <= 375);
        };

        checkSize(); // initial
        window.addEventListener("resize", checkSize);

        return () => window.removeEventListener("resize", checkSize);
    }, []);

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getTaskStats();
                setStats(data);
            } catch (err) {
                console.error("Failed to load stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading || !stats) {
        return (
            <DashboardLayout title="Dashboard">
                <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                    <Spinner size="lg" />
                    <p className="text-neutral-dark font-body">
                        Loading dashboard...
                    </p>
                </div>
            </DashboardLayout>
        );
    }

    const pieData = stats?.priority_breakdown
        ? [
            { name: "High", value: stats.priority_breakdown.high },
            { name: "Medium", value: stats.priority_breakdown.medium },
            { name: "Low", value: stats.priority_breakdown.low },
        ]
        : [];

    const barData = [
        { name: "Completed", value: stats.completed_tasks },
        { name: "Pending", value: stats.pending_tasks },
        { name: "Overdue", value: stats.overdue_tasks },
    ];

    const COLORS = ["#DC2626 ", "#F59E0B", "#059669"];



    return (
        <DashboardLayout title="Dashboard">
            <PageTransition>
                <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
                    <AnimatedPageHeader
                        title="Dashboard"
                        subtitle="Overview of your tasks and progress"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Tasks"
                            value={stats.total_tasks}
                            color="primary"
                        />
                        <StatCard
                            title="Completed"
                            value={stats.completed_tasks}
                            color="success"
                        />
                        <StatCard
                            title="Pending"
                            value={stats.pending_tasks}
                            color="accent"
                        />
                        <StatCard
                            title="Overdue"
                            value={stats.overdue_tasks}
                            color="error"
                        />
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-[#FFFFFF] dark:bg-neutral-darkest rounded-2xl shadow-sm border border-[#F1F5F9] dark:border-neutral-dark overflow-hidden">
                            <div className="px-8 pt-8 pb-6 border-b border-[#F1F5F9] dark:border-neutral-dark
">
                                <h3 className="text-xl font-bold text-[#0F172A] dark:text-neutral-white mb-1" style={{ fontFamily: 'Poppins' }}>
                                    Task Status Overview
                                </h3>
                                <p className="text-sm text-[#334155] dark:text-neutral-light" style={{ fontFamily: 'Inter' }}>Current distribution of your tasks</p>
                            </div>
                            <div className="p-8">
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={barData}>
                                            <XAxis
                                                dataKey="name"
                                                interval={is375 ? 0 : "preserveStartEnd"}
                                                angle={is375 ? -35 : 0}
                                                textAnchor={is375 ? "end" : "middle"}
                                                height={is375 ? 65 : 30}
                                                tickLine={false}
                                                tick={{ fill: isDark ? "#CBD5E1" : "#334155" }}
                                                axisLine={{ stroke: isDark ? "#475569" : "#F1F5F9" }}
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                }}
                                            />


                                            <YAxis
                                                stroke="#334155"
                                                style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: '500' }}
                                                tickLine={false}
                                                axisLine={{ stroke: isDark ? "#475569" : "#F1F5F9" }}
                                                tick={{ fill: isDark ? "#CBD5E1" : "#334155" }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: isDark ? "#0F172A" : "#FFFFFF", color: isDark ? "#F1F5F9" : "#0F172A",
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                                    fontFamily: 'Inter',
                                                    padding: '12px 16px'
                                                }}
                                                cursor={{
                                                    fill: isDark ? "#334155" : "#F1F5F9",
                                                    opacity: isDark ? 0.35 : 0.5
                                                }}

                                            />
                                            <Bar
                                                dataKey="value"
                                                fill="#4F46E5"
                                                radius={[8, 8, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FFFFFF] dark:bg-neutral-darkest rounded-2xl shadow-sm border border-[#F1F5F9] dark:border-neutral-dark overflow-hidden">
                            <div className="px-8 pt-8 pb-6 border-b border-[#F1F5F9] dark:border-neutral-dark">
                                <h3 className="text-xl font-bold text-[#0F172A] dark:text-neutral-white mb-1" style={{ fontFamily: 'Poppins' }}>
                                    Priority Breakdown
                                </h3>
                                <p className="text-sm text-[#334155] dark:text-neutral-light" style={{ fontFamily: 'Inter' }}>Tasks by priority level</p>
                            </div>
                            <div className="p-8">
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                            >
                                                {pieData.map((_, i) => (
                                                    <Cell key={i} fill={COLORS[i]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
                                                    border: "none",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.25)",
                                                    padding: "12px 16px",
                                                }}
                                                labelStyle={{
                                                    color: isDark ? "#F1F5F9" : "#0F172A",
                                                    fontWeight: 600,
                                                    fontFamily: "Inter",
                                                }}
                                                itemStyle={{
                                                    color: isDark ? "#CBD5E1" : "#334155",
                                                    fontFamily: "Inter",
                                                }}
                                            />

                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-6 space-y-3">
                                    {pieData.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                                                    style={{ backgroundColor: COLORS[index] }}
                                                />
                                                <span className="text-sm font-medium text-[#334155] dark:text-neutral-light" style={{ fontFamily: 'Inter' }}>
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-[#0F172A] dark:text-neutral-white" style={{ fontFamily: 'Poppins' }}>
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] dark:bg-neutral-darkest rounded-2xl shadow-sm border border-[#F1F5F9] dark:border-neutral-dark overflow-hidden">
                        <div className="px-8 pt-8 pb-6 border-b border-[#F1F5F9] dark:border-neutral-dark">
                            <h3 className="text-xl font-bold text-[#0F172A] dark:text-neutral-white mb-1" style={{ fontFamily: 'Poppins' }}>
                                Completion Progress
                            </h3>
                            <p className="text-sm text-[#334155] dark:text-neutral-light" style={{ fontFamily: 'Inter' }}>Track your task completion metrics</p>
                        </div>
                        <div className="px-8 py-6 divide-y divide-[#F1F5F9] dark:divide-neutral-dark">
                            <ProgressRow
                                label="Completed Tasks"
                                value={stats.completed_tasks}
                                total={stats.total_tasks}
                                color="success"
                            />
                            <ProgressRow
                                label="Pending Tasks"
                                value={stats.pending_tasks}
                                total={stats.total_tasks}
                                color="accent"
                            />
                            <ProgressRow
                                label="Overdue Tasks"
                                value={stats.overdue_tasks}
                                total={stats.total_tasks}
                                color="error"
                            />
                        </div>
                    </div>

                </div>
            </PageTransition>
        </DashboardLayout>
    );
};

export default Dashboard;