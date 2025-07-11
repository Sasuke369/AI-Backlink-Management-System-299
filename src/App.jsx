import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import BacklinkAnalyzer from './pages/BacklinkAnalyzer';
import MindPalIntelligence from './pages/MindPalIntelligence';
import LinkChest from './pages/LinkChest';
import LinkDistribution from './pages/LinkDistribution';
import AIAutomation from './pages/AIAutomation';
import Integrations from './pages/Integrations';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="lg:pl-64">
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className="py-6">
            <motion.div 
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analyzer" element={<BacklinkAnalyzer />} />
                <Route path="/intelligence" element={<MindPalIntelligence />} />
                <Route path="/link-chest" element={<LinkChest />} />
                <Route path="/distribution" element={<LinkDistribution />} />
                <Route path="/automation" element={<AIAutomation />} />
                <Route path="/integrations" element={<Integrations />} />
              </Routes>
            </motion.div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;