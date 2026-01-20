import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, BarChart3, Upload, Calendar, Bell, Filter, Download, RefreshCw, Eye, Plus } from "lucide-react";
import { statsData } from "../data/mockData";
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  const container = {
    show: { transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  const quickActions = [
    { 
      label: "Add Product", 
      icon: Package, 
      path: "/dashboard/products", 
      color: "from-indigo-500 to-indigo-600",
      description: "Add new products to inventory"
    },
    { 
      label: "New Order", 
      icon: ShoppingCart, 
      path: "/dashboard/orders", 
      color: "from-green-500 to-green-600",
      description: "Create customer orders"
    },
    { 
      label: "Upload Media", 
      icon: Upload, 
      path: "/dashboard/upload", 
      color: "from-blue-500 to-blue-600",
      description: "Upload product images & files"
    },
    { 
      label: "View Reports", 
      icon: BarChart3, 
      path: "/dashboard", 
      color: "from-purple-500 to-purple-600",
      description: "Analyze performance metrics"
    }
  ];

  const recentActivities = [
    { action: "New order received", time: "2 minutes ago", type: "order", icon: ShoppingCart },
    { action: "Product stock updated", time: "15 minutes ago", type: "inventory", icon: Package },
    { action: "New user registered", time: "1 hour ago", type: "user", icon: Users },
    { action: "Report generated", time: "2 hours ago", type: "report", icon: BarChart3 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                Welcome back to PI Global! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-indigo-100 text-lg"
              >
                Here's your business overview and key insights for today.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 md:mt-0 flex items-center space-x-3"
            >
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="7d" className="text-gray-900">Last 7 days</option>
                <option value="30d" className="text-gray-900">Last 30 days</option>
                <option value="90d" className="text-gray-900">Last 90 days</option>
              </select>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-2 hover:bg-white/30 transition-colors">
                <RefreshCw size={20} />
              </button>
            </motion.div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
      </motion.header>

      {/* Stats Cards */}
      <motion.div
        variants={container} 
        initial="hidden" 
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { 
            label: "Total Users", 
            val: statsData.totalUsers, 
            icon: Users, 
            color: "text-blue-600", 
            bg: "from-blue-50 to-blue-100",
            change: "+12%",
            changeType: "positive"
          },
          { 
            label: "Products", 
            val: statsData.totalProducts, 
            icon: Package, 
            color: "text-indigo-600", 
            bg: "from-indigo-50 to-indigo-100",
            change: "+8%",
            changeType: "positive"
          },
          { 
            label: "Orders", 
            val: statsData.totalOrders, 
            icon: ShoppingCart, 
            color: "text-amber-600", 
            bg: "from-amber-50 to-amber-100",
            change: "+23%",
            changeType: "positive"
          },
          { 
            label: "Revenue", 
            val: `₹${statsData.revenue}`, 
            icon: DollarSign, 
            color: "text-emerald-600", 
            bg: "from-emerald-50 to-emerald-100",
            change: "+15%",
            changeType: "positive"
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
              stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              stat.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
              stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
              'bg-emerald-100 text-emerald-600'
            } w-14 h-14`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                stat.changeType === 'positive' 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'bg-red-50 text-red-600'
              }`}>
                <TrendingUp size={12} />
                {stat.change}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.val}</h3>
            <p className="text-xs text-gray-500">vs last period</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Plus className="w-6 h-6 text-indigo-600" />
            Quick Actions
          </h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
            <Eye size={16} />
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = action.path}
              className={`group bg-gradient-to-r ${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left`}
            >
              <div className="flex items-center justify-between mb-3">
                <action.icon size={28} className="group-hover:scale-110 transition-transform duration-300" />
                <div className="w-2 h-2 bg-white/30 rounded-full group-hover:bg-white/50 transition-colors"></div>
              </div>
              <h3 className="font-semibold text-lg mb-1">{action.label}</h3>
              <p className="text-white/80 text-sm">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Sales Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
                  <p className="text-sm text-gray-500">Revenue over time</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download size={16} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Revenue (₹)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgb(34, 197, 94)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(34, 197, 94, 0.5)',
                      borderWidth: 1,
                      cornerRadius: 8,
                    }
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      border: { display: false }
                    },
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(0, 0, 0, 0.05)' },
                      border: { display: false },
                      ticks: {
                        callback: function(value) {
                          return '₹' + value.toLocaleString();
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Monthly Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
                  <p className="text-sm text-gray-500">Orders vs Revenue comparison</p>
                </div>
              </div>
            </div>
            <div className="h-80">
              <Bar
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Orders',
                      data: [65, 59, 80, 81, 56, 55],
                      backgroundColor: 'rgba(99, 102, 241, 0.8)',
                      borderColor: 'rgb(99, 102, 241)',
                      borderWidth: 2,
                      borderRadius: 8,
                      borderSkipped: false,
                    },
                    {
                      label: 'Revenue (₹k)',
                      data: [12, 19, 15, 25, 22, 30],
                      backgroundColor: 'rgba(34, 197, 94, 0.8)',
                      borderColor: 'rgb(34, 197, 94)',
                      borderWidth: 2,
                      borderRadius: 8,
                      borderSkipped: false,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { 
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        padding: 20
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      cornerRadius: 8,
                    }
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      border: { display: false }
                    },
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(0, 0, 0, 0.05)' },
                      border: { display: false }
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                <p className="text-sm text-gray-500">Product distribution</p>
              </div>
            </div>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
                  datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                      'rgba(99, 102, 241, 0.8)',
                      'rgba(168, 85, 247, 0.8)',
                      'rgba(34, 197, 94, 0.8)',
                      'rgba(251, 191, 36, 0.8)',
                      'rgba(239, 68, 68, 0.8)',
                    ],
                    borderWidth: 0,
                    cutout: '60%',
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        padding: 15, 
                        usePointStyle: true,
                        font: { size: 12 }
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      cornerRadius: 8,
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Bell className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-sm text-gray-500">Latest updates</p>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'inventory' ? 'bg-green-100 text-green-600' :
                    activity.type === 'user' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <activity.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:bg-indigo-50 rounded-xl transition-colors">
              View All Activities
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;