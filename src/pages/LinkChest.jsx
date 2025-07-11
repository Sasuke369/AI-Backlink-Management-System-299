import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';
import { Link, Plus, Search, Filter, Mail, ExternalLink, Calendar, User } from 'lucide-react';

export default function LinkChest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockOpportunities = [
    {
      id: 1,
      domain: 'tech-insider.com',
      domain_authority: 78,
      contact_name: 'Sarah Johnson',
      contact_email: 'sarah@tech-insider.com',
      status: 'Contacted',
      last_contact: '2024-01-12',
      response_rate: '45%',
      topics: ['AI', 'Technology', 'Innovation'],
      notes: 'Interested in AI guest posts'
    },
    {
      id: 2,
      domain: 'marketing-hub.com',
      domain_authority: 65,
      contact_name: 'Mike Chen',
      contact_email: 'mike@marketing-hub.com',
      status: 'Pending',
      last_contact: '2024-01-10',
      response_rate: '32%',
      topics: ['Marketing', 'SEO', 'Digital'],
      notes: 'Accepts sponsored content'
    },
    {
      id: 3,
      domain: 'startup-news.com',
      domain_authority: 72,
      contact_name: 'Lisa Rodriguez',
      contact_email: 'lisa@startup-news.com',
      status: 'Secured',
      last_contact: '2024-01-15',
      response_rate: '67%',
      topics: ['Startups', 'Business', 'Innovation'],
      notes: 'Link secured for Q1 article'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Secured':
        return 'bg-success-100 text-success-800';
      case 'Contacted':
        return 'bg-warning-100 text-warning-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tableHeaders = ['Domain', 'DA', 'Contact', 'Status', 'Last Contact', 'Response Rate', 'Topics', 'Actions'];

  const tableData = mockOpportunities.map(opportunity => ({
    domain: (
      <div className="flex items-center space-x-2">
        <ExternalLink className="w-4 h-4 text-gray-400" />
        <span className="font-medium">{opportunity.domain}</span>
      </div>
    ),
    da: (
      <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
        {opportunity.domain_authority}
      </span>
    ),
    contact: (
      <div>
        <p className="font-medium text-sm">{opportunity.contact_name}</p>
        <p className="text-xs text-gray-500">{opportunity.contact_email}</p>
      </div>
    ),
    status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
        {opportunity.status}
      </span>
    ),
    last_contact: opportunity.last_contact,
    response_rate: opportunity.response_rate,
    topics: (
      <div className="flex flex-wrap gap-1">
        {opportunity.topics.slice(0, 2).map((topic, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {topic}
          </span>
        ))}
        {opportunity.topics.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            +{opportunity.topics.length - 2}
          </span>
        )}
      </div>
    ),
    actions: (
      <div className="flex items-center space-x-2">
        <button className="text-primary-600 hover:text-primary-800">
          <Mail className="w-4 h-4" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    )
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Link Chest</h1>
          <p className="text-gray-600">Manage your link building opportunities and campaigns</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Opportunities</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Link className="w-6 h-6 text-primary-600" />
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
              <p className="text-sm text-gray-600">Contacted</p>
              <p className="text-2xl font-semibold text-gray-900">89</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Mail className="w-6 h-6 text-warning-600" />
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
              <p className="text-sm text-gray-600">Secured</p>
              <p className="text-2xl font-semibold text-gray-900">34</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <ExternalLink className="w-6 h-6 text-success-600" />
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
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">21.8%</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="secured">Secured</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Opportunities Table */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Link Opportunities</h3>
        </div>
        
        <Table headers={tableHeaders} data={tableData} />
      </motion.div>

      {/* Add Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Opportunity</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows="3"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowAddModal(false)}>
                  Add Opportunity
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}