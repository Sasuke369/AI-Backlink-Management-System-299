import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import { Target, TrendingUp, AlertCircle, CheckCircle, BarChart3, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function LinkDistribution() {
  const [selectedPage, setSelectedPage] = useState(null);

  const mockPages = [
    {
      id: 1,
      url: '/homepage',
      title: 'Homepage',
      current_links: 45,
      target_links: 60,
      priority: 'High',
      traffic: '125K',
      conversion_rate: '3.2%',
      gap: 15,
      status: 'Needs Attention'
    },
    {
      id: 2,
      url: '/about',
      title: 'About Us',
      current_links: 23,
      target_links: 30,
      priority: 'Medium',
      traffic: '67K',
      conversion_rate: '2.1%',
      gap: 7,
      status: 'On Track'
    },
    {
      id: 3,
      url: '/services',
      title: 'Services',
      current_links: 34,
      target_links: 50,
      priority: 'High',
      traffic: '89K',
      conversion_rate: '4.5%',
      gap: 16,
      status: 'Needs Attention'
    },
    {
      id: 4,
      url: '/blog',
      title: 'Blog',
      current_links: 78,
      target_links: 80,
      priority: 'Medium',
      traffic: '203K',
      conversion_rate: '1.8%',
      gap: 2,
      status: 'Good'
    },
    {
      id: 5,
      url: '/contact',
      title: 'Contact',
      current_links: 12,
      target_links: 15,
      priority: 'Low',
      traffic: '34K',
      conversion_rate: '5.2%',
      gap: 3,
      status: 'On Track'
    }
  ];

  const distributionData = [
    { name: 'Homepage', value: 45, color: '#3b82f6' },
    { name: 'Services', value: 34, color: '#10b981' },
    { name: 'Blog', value: 78, color: '#f59e0b' },
    { name: 'About', value: 23, color: '#ef4444' },
    { name: 'Contact', value: 12, color: '#8b5cf6' }
  ];

  const gapAnalysisData = mockPages.map(page => ({
    name: page.title,
    current: page.current_links,
    target: page.target_links,
    gap: page.gap
  }));

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-danger-100 text-danger-800';
      case 'Medium':
        return 'bg-warning-100 text-warning-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good':
        return 'bg-success-100 text-success-800';
      case 'On Track':
        return 'bg-primary-100 text-primary-800';
      case 'Needs Attention':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Good':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'On Track':
        return <TrendingUp className="w-4 h-4 text-primary-500" />;
      case 'Needs Attention':
        return <AlertCircle className="w-4 h-4 text-warning-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Link Distribution</h1>
          <p className="text-gray-600">Optimize backlink distribution across your website pages</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Auto-Optimize</span>
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Links</p>
              <p className="text-2xl font-semibold text-gray-900">192</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Target Links</p>
              <p className="text-2xl font-semibold text-gray-900">235</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gap</p>
              <p className="text-2xl font-semibold text-gray-900">43</p>
            </div>
            <div className="p-3 bg-danger-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Distribution Score</p>
              <p className="text-2xl font-semibold text-gray-900">78%</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Distribution */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Link Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {distributionData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gap Analysis */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gap Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gapAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#3b82f6" name="Current" />
              <Bar dataKey="target" fill="#10b981" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Page Details */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Page-Level Distribution</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Links
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Links
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Traffic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPages.map((page) => (
                <motion.tr
                  key={page.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={() => setSelectedPage(page)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      <div className="text-sm text-gray-500">{page.url}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {page.current_links}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {page.target_links}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      page.gap > 10 ? 'bg-danger-100 text-danger-800' :
                      page.gap > 5 ? 'bg-warning-100 text-warning-800' :
                      'bg-success-100 text-success-800'
                    }`}>
                      {page.gap}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(page.priority)}`}>
                      {page.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(page.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {page.traffic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Button size="sm" variant="outline">
                      Optimize
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg">
            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-primary-900">Focus on Services Page</h4>
              <p className="text-sm text-primary-700">
                Services page has the highest conversion rate (4.5%) but needs 16 more links to reach target.
                Prioritize link building for this page.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-warning-50 rounded-lg">
            <div className="w-6 h-6 bg-warning-600 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-warning-900">Homepage Link Distribution</h4>
              <p className="text-sm text-warning-700">
                Homepage has 15 link gap. Consider redirecting some blog links to homepage for better 
                overall domain authority distribution.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-success-50 rounded-lg">
            <div className="w-6 h-6 bg-success-600 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-success-900">Blog Performance</h4>
              <p className="text-sm text-success-700">
                Blog is performing well with 78 links (98% of target). Consider using blog posts 
                to internally link to other priority pages.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}