'use client';

import { useState } from 'react';
import JSAForm from '@/components/JSAForm';
import { JobStep } from '@/types';

export default function Home() {
  const [analysis, setAnalysis] = useState<{ jobSteps: JobStep[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleAnalyze = async (data: {
    jobDescription: string;
    vesselType?: string;
    workLocation?: string;
  }) => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div className="max-w-7xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Job Safety Analysis (JSA)
          </h1>
          <p className="text-gray-600 mt-2">
            AI-powered safety analysis for offshore operations
          </p>
        </header>

        <JSAForm
          onAnalyze={handleAnalyze}
          loading={loading}
          analysis={analysis}
        />

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
                    <div className="mb-2">
                      <strong>Parse Error:</strong>
                      <pre className="mt-1 p-2 bg-gray-100">{debugInfo.parseError}</pre>
                    </div>
                  )}
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-600">Full Debug Object</summary>
                    <pre className="mt-1 p-2 bg-gray-100 overflow-auto max-h-40 text-xs">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </details>
                </div>
              </details>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
