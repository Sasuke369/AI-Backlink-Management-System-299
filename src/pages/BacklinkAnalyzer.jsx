import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';
import { Search, Upload, Download, Filter, ExternalLink, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function BacklinkAnalyzer() {
  const [urls, setUrls] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    domain_authority: 'all',
    link_type: 'all'
  });

  const mockResults = [
    {
      url: 'https://techcrunch.com/article-example',
      domain_authority: 92,
      status: 'Active',
      link_type: 'Dofollow',
      anchor_text: 'AI Technology',
      referring_domains: 15420,
      traffic: '2.3M',
      last_checked: '2024-01-15'
    },
    {
      url: 'https://blog.example.com/post',
      domain_authority: 45,
      status: 'Broken',
      link_type: 'Nofollow',
      anchor_text: 'Learn More',
      referring_domains: 234,
      traffic: '45K',
      last_checked: '2024-01-15'
    },
    {
      url: 'https://news.site.com/article',
      domain_authority: 78,
      status: 'Active',
      link_type: 'Dofollow',
      anchor_text: 'Industry Report',
      referring_domains: 5670,
      traffic: '890K',
      last_checked: '2024-01-15'
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'Broken':
        return <XCircle className="w-4 h-4 text-danger-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-warning-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success-100 text-success-800';
      case 'Broken':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-warning-100 text-warning-800';
    }
  };

  const tableHeaders = ['URL', 'DA', 'Status', 'Type', 'Anchor Text', 'Domains', 'Traffic', 'Actions'];

  const tableData = results.map(result => ({
    url: (
      <div className="flex items-center space-x-2">
        <ExternalLink className="w-4 h-4 text-gray-400" />
        <span className="truncate max-w-xs">{result.url}</span>
      </div>
    ),
    da: result.domain_authority,
    status: (
      <div className="flex items-center space-x-2">
        {getStatusIcon(result.status)}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
          {result.status}
        </span>
      </div>
    ),
    type: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        result.link_type === 'Dofollow' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {result.link_type}
      </span>
    ),
    anchor: result.anchor_text,
    domains: result.referring_domains.toLocaleString(),
    traffic: result.traffic,
    actions: (
      <div className="flex items-center space-x-2">
        <button className="text-primary-600 hover:text-primary-800">
          <Search className="w-4 h-4" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Download className="w-4 h-4" />
        </button>
      </div>
    )
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Backlink Analyzer</h1>
        <p className="text-gray-600">Analyze and monitor your backlink portfolio</p>
      </div>

      {/* Input Section */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backlink URLs (one per line)
            </label>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={handleAnalyze}
              loading={isAnalyzing}
              disabled={!urls.trim()}
              className="flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Analyze Backlinks</span>
            </Button>

            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload CSV</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      {results.length > 0 && (
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters:</span>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="broken">Broken</option>
            </select>

            <select
              value={filters.domain_authority}
              onChange={(e) => setFilters({...filters, domain_authority: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All DA</option>
              <option value="high">DA 70+</option>
              <option value="medium">DA 30-69</option>
              <option value="low">DA &lt; 30</option>
            </select>

            <select
              value={filters.link_type}
              onChange={(e) => setFilters({...filters, link_type: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="dofollow">Dofollow</option>
              <option value="nofollow">Nofollow</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{results.length} backlinks analyzed</span>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </div>
          
          <Table headers={tableHeaders} data={tableData} />
        </motion.div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Backlinks</h3>
            <p className="text-gray-600">AI is checking domain authority, link status, and traffic metrics...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}