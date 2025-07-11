import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import Console from '../components/UI/Console';
import { Brain, Upload, Play, Target, Search, Globe, TrendingUp } from 'lucide-react';

export default function MindPalIntelligence() {
  const [competitorUrls, setCompetitorUrls] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);

  const mockResults = {
    competitors: [
      {
        domain: 'competitor1.com',
        domain_authority: 78,
        backlinks: 12450,
        referring_domains: 2340,
        top_keywords: ['AI technology', 'machine learning', 'automation'],
        traffic: '2.4M',
        opportunities: 156
      },
      {
        domain: 'competitor2.com',
        domain_authority: 65,
        backlinks: 8920,
        referring_domains: 1890,
        top_keywords: ['digital marketing', 'SEO tools', 'analytics'],
        traffic: '1.2M',
        opportunities: 98
      }
    ],
    opportunities: [
      {
        domain: 'tech-blog.com',
        domain_authority: 72,
        relevance: 'High',
        contact_email: 'editor@tech-blog.com',
        last_post: '2024-01-12',
        topics: ['AI', 'Technology', 'Innovation']
      },
      {
        domain: 'industry-news.com',
        domain_authority: 68,
        relevance: 'Medium',
        contact_email: 'news@industry-news.com',
        last_post: '2024-01-14',
        topics: ['Business', 'Technology', 'Startups']
      }
    ]
  };

  const startAnalysis = async () => {
    setIsRunning(true);
    setLogs([]);
    setResults(null);

    const analysisSteps = [
      { type: 'info', message: 'Initializing MindPal AI agents...' },
      { type: 'info', message: 'Connecting to competitor analysis modules...' },
      { type: 'success', message: 'Successfully connected to domain analysis API' },
      { type: 'info', message: 'Analyzing competitor backlink profiles...' },
      { type: 'info', message: 'Extracting top-performing content...' },
      { type: 'success', message: 'Found 234 potential link opportunities' },
      { type: 'info', message: 'Analyzing domain authority and relevance...' },
      { type: 'info', message: 'Extracting contact information...' },
      { type: 'success', message: 'Analysis complete! Generated actionable insights' }
    ];

    for (let i = 0; i < analysisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, { ...analysisSteps[i], timestamp }]);
    }

    setResults(mockResults);
    setIsRunning(false);
  };

  const stopAnalysis = () => {
    setIsRunning(false);
  };

  const clearLogs = () => {
    setLogs([]);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">MindPal Intelligence</h1>
        <p className="text-gray-600">AI-powered competitor analysis and opportunity discovery</p>
      </div>

      {/* Configuration */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Competitor URLs (one per line)
            </label>
            <textarea
              value={competitorUrls}
              onChange={(e) => setCompetitorUrls(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://competitor1.com&#10;https://competitor2.com&#10;https://competitor3.com"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={startAnalysis}
              loading={isRunning}
              disabled={!competitorUrls.trim() || isRunning}
              className="flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>Start AI Analysis</span>
            </Button>

            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload CSV</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Console */}
      <Console 
        logs={logs}
        isRunning={isRunning}
        onStart={startAnalysis}
        onStop={stopAnalysis}
        onClear={clearLogs}
      />

      {/* Results */}
      {results && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Competitor Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Competitor Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.competitors.map((competitor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{competitor.domain}</h4>
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                      DA {competitor.domain_authority}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Backlinks:</span>
                      <p className="font-semibold">{competitor.backlinks.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Domains:</span>
                      <p className="font-semibold">{competitor.referring_domains.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Traffic:</span>
                      <p className="font-semibold">{competitor.traffic}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Opportunities:</span>
                      <p className="font-semibold text-success-600">{competitor.opportunities}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-600 text-sm">Top Keywords:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {competitor.top_keywords.map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Link Opportunities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Link Opportunities
            </h3>
            <div className="space-y-4">
              {results.opportunities.map((opportunity, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{opportunity.domain}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.relevance === 'High' ? 'bg-success-100 text-success-800' :
                        opportunity.relevance === 'Medium' ? 'bg-warning-100 text-warning-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {opportunity.relevance} Relevance
                      </span>
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                        DA {opportunity.domain_authority}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Contact:</span>
                      <p className="font-medium">{opportunity.contact_email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Post:</span>
                      <p className="font-medium">{opportunity.last_post}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Topics:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {opportunity.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}