import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Plus, Settings, Trash2, ArrowRight } from 'lucide-react';
import Button from './Button';

export default function AutomationFlow({ title, description, platform, nodes = [], onSave }) {
  const [expanded, setExpanded] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  
  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'n8n':
        return 'bg-blue-100 text-blue-800';
      case 'make':
        return 'bg-purple-100 text-purple-800';
      case 'zapier':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformColor(platform)}`}>
              {platform}
            </span>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-6">
          {/* Flow visualization */}
          <div className="flex flex-wrap items-center">
            {nodes.map((node, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="bg-gray-100 rounded-lg p-3 flex items-center"
                  whileHover={{ y: -2 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${node.color || 'bg-primary-100 text-primary-600'}`}>
                    <node.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{node.name}</p>
                    <p className="text-xs text-gray-500">{node.type}</p>
                  </div>
                </motion.div>
                
                {index < nodes.length - 1 && (
                  <div className="mx-2 text-gray-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </React.Fragment>
            ))}
            
            <button className="ml-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {showDetails && (
            <motion.div
              className="mt-6 border-t border-gray-200 pt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Workflow Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Trigger Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Manual</option>
                        <option>Scheduled</option>
                        <option>Webhook</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Run Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Every hour</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Integration Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        {platform === 'n8n' ? 'Workflow ID' : platform === 'make' ? 'Scenario ID' : 'Zap ID'}
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder={platform === 'n8n' ? 'n8n-workflow-id' : platform === 'make' ? 'make-scenario-id' : 'zap-id'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Webhook URL</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center space-x-2 text-danger-600 border-danger-300 hover:bg-danger-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Workflow</span>
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowDetails(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setShowDetails(false);
                        if (onSave) onSave();
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}