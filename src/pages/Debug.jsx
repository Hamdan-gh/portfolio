import { useState, useEffect } from 'react';
import { api, API_URL } from '../config/api';

const Debug = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    const diagnostics = {
      apiUrl: API_URL,
      environment: {
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD,
        mode: import.meta.env.MODE,
        viteApiUrl: import.meta.env.VITE_API_URL
      },
      tests: {}
    };

    // Test 1: Backend health check
    try {
      const healthUrl = API_URL.replace('/api', '');
      const response = await fetch(healthUrl);
      const data = await response.json();
      diagnostics.tests.healthCheck = {
        status: 'success',
        url: healthUrl,
        data
      };
    } catch (error) {
      diagnostics.tests.healthCheck = {
        status: 'failed',
        error: error.message
      };
    }

    // Test 2: Profile endpoint
    try {
      const data = await api.get('/profile');
      diagnostics.tests.profile = {
        status: 'success',
        url: `${API_URL}/profile`,
        data,
        count: data.length
      };
    } catch (error) {
      diagnostics.tests.profile = {
        status: 'failed',
        url: `${API_URL}/profile`,
        error: error.message
      };
    }

    // Test 3: Skills endpoint
    try {
      const data = await api.get('/skills');
      diagnostics.tests.skills = {
        status: 'success',
        url: `${API_URL}/skills`,
        data,
        count: data.length
      };
    } catch (error) {
      diagnostics.tests.skills = {
        status: 'failed',
        url: `${API_URL}/skills`,
        error: error.message
      };
    }

    // Test 4: Experience endpoint
    try {
      const data = await api.get('/experience');
      diagnostics.tests.experience = {
        status: 'success',
        url: `${API_URL}/experience`,
        data,
        count: data.length
      };
    } catch (error) {
      diagnostics.tests.experience = {
        status: 'failed',
        url: `${API_URL}/experience`,
        error: error.message
      };
    }

    // Test 5: CORS test
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      diagnostics.tests.cors = {
        status: response.ok ? 'success' : 'failed',
        statusCode: response.status,
        statusText: response.statusText
      };
    } catch (error) {
      diagnostics.tests.cors = {
        status: 'failed',
        error: error.message
      };
    }

    setResults(diagnostics);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl">Running diagnostics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-300 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Deployment Diagnostics</h1>

        {/* Environment Info */}
        <div className="glass p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4">Environment</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">API URL:</span>
              <span className="text-primary">{results.apiUrl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mode:</span>
              <span>{results.environment.mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Is Production:</span>
              <span>{results.environment.isProd ? '✅ Yes' : '❌ No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">VITE_API_URL:</span>
              <span className="text-primary">{results.environment.viteApiUrl || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {Object.entries(results.tests).map(([testName, result]) => (
            <div key={testName} className="glass p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold capitalize">{testName.replace(/([A-Z])/g, ' $1')}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  result.status === 'success' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {result.status === 'success' ? '✅ Success' : '❌ Failed'}
                </span>
              </div>

              {result.url && (
                <div className="mb-2">
                  <span className="text-gray-400 text-sm">URL: </span>
                  <span className="text-primary text-sm font-mono">{result.url}</span>
                </div>
              )}

              {result.error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-2">
                  <span className="text-red-500 text-sm font-mono">{result.error}</span>
                </div>
              )}

              {result.data && (
                <div className="bg-dark-200 rounded p-3 overflow-auto max-h-48">
                  <pre className="text-xs text-gray-300">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}

              {result.count !== undefined && (
                <div className="mt-2 text-sm text-gray-400">
                  Items found: {result.count}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={runDiagnostics}
              className="w-full bg-primary px-4 py-2 rounded-lg hover:bg-cyan-600"
            >
              🔄 Re-run Diagnostics
            </button>
            <a
              href="/"
              className="block w-full text-center bg-dark-200 px-4 py-2 rounded-lg hover:bg-dark-100"
            >
              🏠 Go to Homepage
            </a>
            <a
              href="/login"
              className="block w-full text-center bg-dark-200 px-4 py-2 rounded-lg hover:bg-dark-100"
            >
              🔐 Go to Login
            </a>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div className="mt-8 glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Troubleshooting Tips</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✅ If all tests pass but no data shows: Add data in admin panel</li>
            <li>❌ If health check fails: Backend is down or URL is wrong</li>
            <li>❌ If CORS fails: Check backend CORS configuration</li>
            <li>❌ If endpoints fail: Check MongoDB connection</li>
            <li>⏳ If tests timeout: Backend might be sleeping (wait 60s and retry)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Debug;
