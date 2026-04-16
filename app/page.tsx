'use client';

import { useState } from 'react';
import { JobStep } from '@/types';

export default function Home() {
  const [formData, setFormData] = useState({
    vesselCode: '',
    vesselName: '',
    client: '',
    vesselLocation: '',
    jobDescription: '',
  });
  const [analysis, setAnalysis] = useState<{ jobSteps: JobStep[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!formData.jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: formData.jobDescription,
          vesselType: formData.vesselName,
          workLocation: formData.vesselLocation,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('❌ API Error:', result);
        setDebugInfo(result);
        setError(result.error || 'Analysis failed');
        return;
      }

      console.log('✅ Success:', result._meta);
      setAnalysis(result);
    } catch (err: any) {
      console.error('❌ Request failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Job Safety Analysis (JSA)</h1>
          <p className="text-gray-600 mt-2">AI-powered safety analysis for offshore operations</p>
        </header>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Code</label>
              <input
                type="text"
                value={formData.vesselCode}
                onChange={(e) => setFormData({ ...formData, vesselCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., WB-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Name</label>
              <input
                type="text"
                value={formData.vesselName}
                onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Accommodation Barge"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Describe the job task..."
                required
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Job with AI'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-bold text-red-800">Error:</h3>
            <p className="text-red-700">{error}</p>
            
            {debugInfo && (
              <details className="mt-4">
                <summary className="cursor-pointer text-red-600 font-semibold">
                  🔍 Debug Info (click to expand)
                </summary>
                <div className="mt-2 p-4 bg-white border rounded text-xs">
                  <div className="mb-2">
                    <strong>Provider:</strong> {debugInfo.provider || 'unknown'}
                  </div>
                  <div className="mb-2">
                    <strong>Model:</strong> {debugInfo.model || 'unknown'}
                  </div>
                  {debugInfo.preview && (
                    <div className="mb-2">
                      <strong>AI Response Preview:</strong>
                      <pre className="mt-1 p-2 bg-gray-100 overflow-auto max-h-60 text-xs whitespace-pre-wrap">
                        {debugInfo.preview}
                      </pre>
                    </div>
                  )}
                  {debugInfo.parseError && (
                    <div className="mb-2 text-red-600">
                      <strong>Parse Error:</strong> {debugInfo.parseError}
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        )}

        {analysis && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded">
            <h3 className="font-bold text-green-800 mb-4">✅ Analysis Complete!</h3>
            <p className="text-sm text-gray-600">Found {analysis.jobSteps?.length || 0} job steps</p>
          </div>
        )}
      </div>
    </main>
  );
}
