import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import Console from '../components/UI/Console';
import AutomationFlow from '../components/UI/AutomationFlow';
import { 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  Zap, 
  Mail, 
  Globe, 
  Target, 
  Clock, 
  Plus,
  Search,
  Server,
  Database,
  Repeat,
  AlertTriangle
} from 'lucide-react';

export default function AIAutomation() {
  const [activeWorkflows, setActiveWorkflows] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showIntegrationsSection, setShowIntegrationsSection] = useState(true);

  const workflows = [
    {
      id: 1,
      name: 'SEO Buddy Outreach',
      description: 'Automated email outreach using SEO Buddy platform',
      status: 'Active',
      success_rate: '23%',
      emails_sent: 145,
      responses: 34,
      links_secured: 12,
      last_run: '2 hours ago',
      icon: Mail
    },
    {
      id: 2,
      name: 'MindPal Competitor Analysis',
      description: 'Continuous competitor monitoring and opportunity discovery',
      status: 'Running',
      success_rate: '87%',
      opportunities_found: 89,
      domains_analyzed: 234,
      new_prospects: 23,
      last_run: '15 minutes ago',
      icon: Globe
    },
    {
      id: 3,
      name: 'Link Distribution Optimizer',
      description: 'AI-powered link distribution across website pages',
      status: 'Scheduled',
      success_rate: '94%',
      pages_optimized: 45,
      links_redistributed: 67,
      score_improvement: '+12%',
      last_run: '1 day ago',
      icon: Target
    },
    {
      id: 4,
      name: 'Follow-up Sequence',
      description: 'Automated follow-up emails for link building campaigns',
      status: 'Paused',
      success_rate: '31%',
      follow_ups_sent: 78,
      responses: 24,
      conversions: 8,
      last_run: '3 hours ago',
      icon: Clock
    }
  ];

  const mockLogs = [
    { type: 'info', message: 'Initializing SEO Buddy automation agent...', timestamp: '14:23:45' },
    { type: 'success', message: 'Successfully logged into SEO Buddy platform', timestamp: '14:23:47' },
    { type: 'info', message: 'Reading campaign instructions from Link Chest...', timestamp: '14:23:48' },
    { type: 'info', message: 'Found 23 new prospects to contact', timestamp: '14:23:50' },
    { type: 'info', message: 'Personalizing outreach emails using AI...', timestamp: '14:23:52' },
    { type: 'success', message: 'Sent personalized email to tech-blog.com', timestamp: '14:23:54' },
    { type: 'success', message: 'Sent personalized email to marketing-hub.com', timestamp: '14:23:56' },
    { type: 'warning', message: 'Email bounce detected for invalid-email@domain.com', timestamp: '14:23:58' },
    { type: 'info', message: 'Scheduling follow-up for non-responders in 5 days', timestamp: '14:24:00' },
    { type: 'success', message: 'Campaign batch completed - 20 emails sent successfully', timestamp: '14:24:02' }
  ];

  // Sample automation flows for n8n and Make.com
  const automationFlows = [
    {
      id: 1,
      title: 'Daily Backlink Monitor',
      description: 'Checks backlink status daily and sends alerts for broken links',
      platform: 'n8n',
      nodes: [
        { name: 'Schedule', type: 'Trigger', icon: Clock, color: 'bg-blue-100 text-blue-600' },
        { name: 'Backlink API', type: 'Action', icon: Search, color: 'bg-green-100 text-green-600' },
        { name: 'Filter', type: 'Logic', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Email', type: 'Action', icon: Mail, color: 'bg-purple-100 text-purple-600' }
      ]
    },
    {
      id: 2,
      title: 'Competitor Link Monitoring',
      description: 'Tracks new backlinks from competitors and identifies opportunities',
      platform: 'make',
      nodes: [
        { name: 'Weekly Schedule', type: 'Trigger', icon: Clock, color: 'bg-purple-100 text-purple-600' },
        { name: 'Fetch Competitors', type: 'Action', icon: Database, color: 'bg-indigo-100 text-indigo-600' },
        { name: 'Analyze Backlinks', type: 'Action', icon: Search, color: 'bg-green-100 text-green-600' },
        { name: 'Filter New Links', type: 'Logic', icon: Target, color: 'bg-blue-100 text-blue-600' },
        { name: 'Add to Opportunities', type: 'Action', icon: Plus, color: 'bg-red-100 text-red-600' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Running':
        return 'bg-success-100 text-success-800';
      case 'Scheduled':
        return 'bg-primary-100 text-primary-800';
      case 'Paused':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
      case 'Running':
        return <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>;
      case 'Scheduled':
        return <div className="w-2 h-2 bg-primary-500 rounded-full"></div>;
      case 'Paused':
        return <div className="w-2 h-2 bg-warning-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const startWorkflow = (workflow) => {
    setIsRunning(true);
    setSelectedWorkflow(workflow);
    setLogs(mockLogs);
    
    // Simulate workflow completion
    setTimeout(() => {
      setIsRunning(false);
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, { 
        type: 'success', 
        message: `${workflow.name} completed successfully`, 
        timestamp 
      }]);
    }, 10000);
  };

  const stopWorkflow = () => {
    setIsRunning(false);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { 
      type: 'warning', 
      message: 'Workflow stopped by user', 
      timestamp 
    }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Automation</h1>
          <p className="text-gray-600">Manage your automated link building workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              {workflows.filter(w => w.status === 'Active' || w.status === 'Running').length} workflows active
            </span>
          </div>
          <Button className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Workflows</p>
              <p className="text-2xl font-semibold text-gray-900">{workflows.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Bot className="w-6 h-6 text-primary-600" />
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
              <p className="text-sm text-gray-600">Active Workflows</p>
              <p className="text-2xl font-semibold text-gray-900">
                {workflows.filter(w => w.status === 'Active' || w.status === 'Running').length}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Play className="w-6 h-6 text-success-600" />
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
              <p className="text-sm text-gray-600">Emails Sent Today</p>
              <p className="text-2xl font-semibold text-gray-900">127</p>
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
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">24.3%</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Zap className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* External Integration Flows */}
      <div className="border-b border-gray-200 pb-2 mb-4">
        <button
          onClick={() => setShowIntegrationsSection(!showIntegrationsSection)}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <h2 className="text-lg font-semibold">External Automation Flows</h2>
          {showIntegrationsSection ? (
            <ChevronDown className="w-5 h-5 ml-2" />
          ) : (
            <ChevronRight className="w-5 h-5 ml-2" />
          )}
        </button>
      </div>

      {showIntegrationsSection && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {automationFlows.map(flow => (
            <AutomationFlow
              key={flow.id}
              title={flow.title}
              description={flow.description}
              platform={flow.platform}
              nodes={flow.nodes}
              onSave={() => console.log('Flow saved', flow.id)}
            />
          ))}

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Automation Flow</span>
            </Button>
          </div>
        </motion.div>
      )}

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <workflow.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(workflow.status)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(workflow.status)}`}>
                  {workflow.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600">Success Rate:</span>
                <p className="font-semibold">{workflow.success_rate}</p>
              </div>
              <div>
                <span className="text-gray-600">Last Run:</span>
                <p className="font-semibold">{workflow.last_run}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              {workflow.emails_sent && (
                <div>
                  <span className="text-gray-600">Emails:</span>
                  <p className="font-semibold">{workflow.emails_sent}</p>
                </div>
              )}
              {workflow.opportunities_found && (
                <div>
                  <span className="text-gray-600">Opportunities:</span>
                  <p className="font-semibold">{workflow.opportunities_found}</p>
                </div>
              )}
              {workflow.pages_optimized && (
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <p className="font-semibold">{workflow.pages_optimized}</p>
                </div>
              )}
              {workflow.responses && (
                <div>
                  <span className="text-gray-600">Responses:</span>
                  <p className="font-semibold">{workflow.responses}</p>
                </div>
              )}
              {workflow.domains_analyzed && (
                <div>
                  <span className="text-gray-600">Domains:</span>
                  <p className="font-semibold">{workflow.domains_analyzed}</p>
                </div>
              )}
              {workflow.links_redistributed && (
                <div>
                  <span className="text-gray-600">Links:</span>
                  <p className="font-semibold">{workflow.links_redistributed}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                onClick={() => startWorkflow(workflow)}
                disabled={isRunning}
                className="flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Run</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Configure</span>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Agent Console */}
      <Console 
        logs={logs}
        isRunning={isRunning}
        onStart={() => startWorkflow(workflows[0])}
        onStop={stopWorkflow}
        onClear={clearLogs}
      />

      {/* Workflow Templates */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <Bot className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Custom Outreach</h4>
            <p className="text-sm text-gray-600">Create personalized email sequences</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Competitor Monitor</h4>
            <p className="text-sm text-gray-600">Track competitor link building</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Link Audit</h4>
            <p className="text-sm text-gray-600">Automated link health monitoring</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ChevronDown and ChevronRight components for section toggle
function ChevronDown(props) {
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
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

function ChevronRight(props) {
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
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}