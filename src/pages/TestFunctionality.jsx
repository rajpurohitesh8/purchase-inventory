import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Database, Package } from 'lucide-react';
import database from '../services/database';
import fileService from '../services/fileService';
import productService from '../services/productService';
import { useToast } from '../contexts/ToastContext';

const TestFunctionality = () => {
  const { showSuccess, showError } = useToast();
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const data = database.getData();
      setTestResults(prev => [...prev, { 
        test: 'Database Test', 
        success: true, 
        message: `Found ${data.files.length} files and ${data.products.length} products` 
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, { 
        test: 'Database Test', 
        success: false, 
        message: error.message 
      }]);
    }

    try {
      const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      const result = await fileService.uploadFile(mockFile, 'documents');
      setTestResults(prev => [...prev, { 
        test: 'File Upload Test', 
        success: result.success, 
        message: result.success ? 'File uploaded successfully' : result.error 
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, { 
        test: 'File Upload Test', 
        success: false, 
        message: error.message 
      }]);
    }

    setIsRunning(false);
    showSuccess('Tests completed!');
  };

  const clearDatabase = () => {
    if (window.confirm('Clear all data?')) {
      localStorage.removeItem('PI_GLOBAL_DB');
      database.initializeDB();
      showSuccess('Database cleared!');
      setTestResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Test</h1>
        <p className="text-gray-600">Test database functionality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="flex items-center justify-center gap-3 p-6 bg-green-600 text-white rounded-2xl hover:bg-green-700 disabled:opacity-50"
        >
          <CheckCircle size={24} />
          <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
        </button>

        <button
          onClick={clearDatabase}
          className="flex items-center justify-center gap-3 p-6 bg-red-600 text-white rounded-2xl hover:bg-red-700"
        >
          <Database size={24} />
          <span>Clear Database</span>
        </button>

        <div className="flex items-center justify-center gap-3 p-6 bg-blue-600 text-white rounded-2xl">
          <Package size={24} />
          <div className="text-center">
            <div className="font-semibold">Database Status</div>
            <div className="text-sm opacity-90">Active</div>
          </div>
        </div>
      </div>

      {testResults.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-4">Test Results</h2>
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  result.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <CheckCircle size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{result.test}</div>
                  <div className="text-sm">{result.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestFunctionality;