import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";
import { invoiceService } from "@/services/api/invoiceService";
import { clientService } from "@/services/api/clientService";

const DashboardStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");

      const [projects, tasks, invoices, clients] = await Promise.all([
        projectService.getAll(),
        taskService.getAll(),
        invoiceService.getAll(),
        clientService.getAll()
      ]);

      const activeProjects = projects.filter(p => p.status === "active").length;
      const pendingTasks = tasks.filter(t => !t.completed).length;
      const unpaidInvoices = invoices.filter(i => i.status === "pending" || i.status === "overdue").length;
      const totalRevenue = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);

      setStats({
        activeProjects,
        pendingTasks,
        unpaidInvoices,
        totalRevenue
      });
    } catch (err) {
      setError("Failed to load dashboard statistics");
      console.error("Error loading stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStats} />;

  const statsData = [
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: "FolderKanban",
      trend: "up",
      trendValue: "+12%",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: "CheckSquare",
      trend: "down",
      trendValue: "-8%",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Unpaid Invoices",
      value: stats.unpaidInvoices,
      icon: "FileText",
      trend: "up",
      trendValue: "+3%",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue?.toLocaleString() || "0"}`,
      icon: "DollarSign",
      trend: "up",
      trendValue: "+25%",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;