import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Pause, Trash2 } from 'lucide-react';

export default function Console({ logs = [], isRunning = false, onStart, onStop, onClear }) {
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type) => {
    switch (type) {
      case 'success': return 'text-success-400';
      case 'error': return 'text-danger-400';
      case 'warning': return 'text-warning-400';
      case 'info': return 'text-primary-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-gray-400" />
          <span className="text-white font-medium">AI Agent Console</span>
          {isRunning && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-success-400 text-sm">Running</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={isRunning ? onStop : onStart}
            className={`p-2 rounded-lg transition-colors ${
              isRunning 
                ? 'bg-danger-600 hover:bg-danger-700 text-white' 
                : 'bg-success-600 hover:bg-success-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={onClear}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div 
        ref={consoleRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 italic">Console ready... Start an AI agent to see logs</div>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={index}
              className={`mb-1 ${getLogColor(log.type)}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}