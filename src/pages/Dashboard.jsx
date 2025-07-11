import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/UI/StatCard';
import { 
  Link, 
  TrendingUp, 
  Users, 
  Mail, 
  Target, 
  Bot,
  Activity,
  Globe
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockData = [
  { name: 'Jan', backlinks: 245, outreach: 89, success: 23 },
  { name: 'Feb', backlinks: 312, outreach: 134, success: 45 },
  { name: 'Mar', backlinks: 389, outreach: 167, success: 67 },
  { name: 'Apr', backlinks: 445, outreach: 198, success: 89 },
  { name: 'May', backlinks: 567, outreach: 234, success: 123 },
  { name: 'Jun', backlinks: 634, outreach: 267, success: 156 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBacklinks: 2847,
    activeLinks: 2634,
    outreachSent: 1289,
    successRate: 18.4,
    domainsAnalyzed: 456,
    aiAgentsRunning: 3,
  });

  const [recentActivity, setRecentActivity] = useState([
    { type: 'success', message: 'New backlink acquired from tech-blog.com', time: '2 min ago' },
    { type: 'info', message: 'MindPal agent analyzing 50 competitor domains', time: '5 min ago' },
    { type: 'warning', message: 'Outreach email bounce rate increased to 12%', time: '8 min ago' },
    { type: 'success', message: 'Link distribution optimized for 25 pages', time: '12 min ago' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">AI-powered backlink management overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">All systems operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Backlinks"
          value={stats.totalBacklinks.toLocaleString()}
          change="+12.3%"
          icon={Link}
          color="primary"
        />
        <StatCard
          title="Active Links"
          value={stats.activeLinks.toLocaleString()}
          change="+8.7%"
          icon={Activity}
          color="success"
        />
        <StatCard
          title="Outreach Sent"
          value={stats.outreachSent.toLocaleString()}
          change="+23.1%"
          icon={Mail}
          color="warning"
        />
        <StatCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          change="+2.4%"
          icon={TrendingUp}
          color="success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backlink Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="backlinks" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outreach Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="outreach" fill="#6b7280" />
              <Bar dataKey="success" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-success-500' :
                activity.type === 'warning' ? 'bg-warning-500' :
                'bg-primary-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-primary-50 rounded-lg p-6 border border-primary-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary-900">AI Agents</h4>
              <p className="text-sm text-primary-700">{stats.aiAgentsRunning} active</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-success-50 rounded-lg p-6 border border-success-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-600 rounded-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-success-900">Domains</h4>
              <p className="text-sm text-success-700">{stats.domainsAnalyzed} analyzed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-warning-50 rounded-lg p-6 border border-warning-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-600 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-warning-900">Campaigns</h4>
              <p className="text-sm text-warning-700">12 running</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}