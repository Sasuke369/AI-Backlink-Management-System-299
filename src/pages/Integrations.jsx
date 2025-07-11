import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import { Puzzle, Link, Zap, Check, X, Settings, ArrowRight, Code, Globe, Webhook } from 'lucide-react';

export default function Integrations() {
  const [activeTab, setActiveTab] = useState('available');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const availableIntegrations = [
    {
      id: 'n8n',
      name: 'n8n',
      description: 'Open-source workflow automation tool with powerful node-based workflows',
      icon: '/n8n-logo.png',
      iconFallback: Zap,
      status: 'available',
      category: 'automation',
      features: [
        'Trigger backlink analysis automatically',
        'Schedule competitor monitoring',
        'Process outreach responses',
        'Generate reports and alerts'
      ]
    },
    {
      id: 'make',
      name: 'Make.com',
      description: 'Visual automation platform for connecting apps and automating workflows',
      icon: '/make-logo.png',
      iconFallback: Puzzle,
      status: 'available',
      category: 'automation',
      features: [
        'Create custom outreach sequences',
        'Import prospects from CRM systems',
        'Sync link data with spreadsheets',
        'Automate reporting and data collection'
      ]
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect your apps and automate workflows',
      icon: '/zapier-logo.png',
      iconFallback: Link,
      status: 'connected',
      category: 'automation',
      features: [
        'Connect with 3000+ apps',
        'Automate repetitive tasks',
        'Create multi-step workflows',
        'No code required'
      ]
    },
    {
      id: 'ahrefs',
      name: 'Ahrefs',
      description: 'SEO tools to grow your search traffic',
      icon: '/ahrefs-logo.png',
      iconFallback: Globe,
      status: 'available',
      category: 'seo',
      features: [
        'Import backlink data',
        'Sync competitor analysis',
        'Track keyword rankings',
        'Monitor domain health'
      ]
    }
  ];

  const connectedIntegrations = availableIntegrations.filter(integration => integration.status === 'connected');
  const displayedIntegrations = activeTab === 'available' 
    ? availableIntegrations.filter(integration => integration.status === 'available')
    : connectedIntegrations;

  const handleConnect = (integration) => {
    setSelectedPlatform(integration);
    setShowConnectModal(true);
  };

  const mockConnect = () => {
    setShowConnectModal(false);
    // In a real app, this would make an API call to store credentials
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect your AI Backlink Agent with external platforms</p>
        </div>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Webhook className="w-4 h-4" />
          <span>API Documentation</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'available' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('available')}
        >
          Available Integrations
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'connected' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('connected')}
        >
          Connected ({connectedIntegrations.length})
        </button>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedIntegrations.map((integration) => (
          <motion.div
            key={integration.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  {integration.icon ? (
                    <img 
                      src={integration.icon} 
                      alt={integration.name} 
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <integration.iconFallback 
                    className="w-6 h-6 text-gray-500"
                    style={{ display: integration.icon ? 'none' : 'block' }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>
              <div>
                {integration.status === 'connected' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    <Check className="w-3 h-3 mr-1" />
                    Connected
                  </span>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleConnect(integration)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-gray-700">Key Features:</h4>
              <ul className="space-y-1">
                {integration.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {integration.status === 'connected' ? (
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 border-danger-500 text-danger-600 hover:bg-danger-50">
                  <X className="w-4 h-4" />
                  <span>Disconnect</span>
                </Button>
              </div>
            ) : (
              <div className="mt-4">
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  Learn more about {integration.name} integration
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Webhook and API Section */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start space-x-4">
          <div className="bg-primary-100 p-3 rounded-lg">
            <Code className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API & Webhooks</h3>
            <p className="text-gray-600 mb-4">
              Use our API and webhooks to build custom integrations with any platform.
              Connect your AI Backlink Agent with your own systems.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Webhook URL</h4>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-sm text-gray-800 font-mono overflow-x-auto">
                    https://api.aibacklink.com/webhook/YOUR_API_KEY
                  </code>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">API Key</h4>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-sm text-gray-800 font-mono">
                    ••••••••••••••••••••••••
                  </code>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Integration Examples */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">n8n Workflow Example</h4>
            <p className="text-sm text-gray-600 mb-3">
              Automate backlink analysis and reporting with n8n's visual workflow builder.
            </p>
            <img
              src="/n8n-example.png"
              alt="n8n Workflow Example"
              className="w-full h-32 object-cover rounded-lg bg-gray-100"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>';
                e.target.style.padding = '2rem';
              }}
            />
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View Example
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Make.com Scenario</h4>
            <p className="text-sm text-gray-600 mb-3">
              Create multi-step outreach campaigns with Make.com's powerful scenario builder.
            </p>
            <img
              src="/make-example.png"
              alt="Make.com Scenario Example"
              className="w-full h-32 object-cover rounded-lg bg-gray-100"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>';
                e.target.style.padding = '2rem';
              }}
            />
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View Example
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">API Integration</h4>
            <p className="text-sm text-gray-600 mb-3">
              Custom integration using our REST API for advanced automation needs.
            </p>
            <div className="w-full h-32 bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-hidden">
              <pre className="text-gray-700">
{`// Example API request
fetch('https://api.aibacklink.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    urls: ['https://example.com']
  })
})`}
              </pre>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View API Docs
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Connection Modal */}
      {showConnectModal && selectedPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  {selectedPlatform.icon ? (
                    <img 
                      src={selectedPlatform.icon} 
                      alt={selectedPlatform.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <selectedPlatform.iconFallback 
                    className="w-5 h-5 text-gray-500"
                    style={{ display: selectedPlatform.icon ? 'none' : 'block' }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Connect to {selectedPlatform.name}</h3>
              </div>

              <div className="space-y-4">
                {selectedPlatform.id === 'n8n' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">n8n Instance URL</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="https://your-n8n-instance.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="n8n_api_..."
                      />
                    </div>
                  </>
                )}

                {selectedPlatform.id === 'make' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Make.com API Key</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="make_api_..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL (optional)</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="https://hook.make.com/..."
                      />
                    </div>
                  </>
                )}

                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                  <p className="flex items-start">
                    <Info className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    {selectedPlatform.id === 'n8n' 
                      ? 'Connect your self-hosted or cloud n8n instance to automate workflows. You will need an API key from your n8n instance.'
                      : 'Connect to Make.com to create powerful automation scenarios. You will need an API key from your Make.com account.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowConnectModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={mockConnect}>
                  Connect
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Info icon component for the modal
function Info(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}