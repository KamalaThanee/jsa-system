'use client';

import { useState } from 'react';
import { JobStep } from '@/types';
import JobStepCard from '@/components/JobStepCard';

export default function Home() {
  const [formData, setFormData] = useState({
    vesselCode: '',
    vesselName: '',
    client: '',
    vesselLocation: '',
    jobDescription: '',
  });
  const [jsaData, setJsaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!formData.jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);
    
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
        setError(result.error || 'Analysis failed');
        return;
      }

      console.log('✅ Analysis complete:', result._meta);
      setJsaData({
        ...formData,
        jobSteps: result.jobSteps,
        _meta: result._meta,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!jsaData) return;

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsaData),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `JSA_${formData.vesselCode || 'export'}_${Date.now()}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export document');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Job Safety Analysis (JSA)</h1>
          <p className="text-gray-600 mt-2">AI-powered safety analysis for offshore operations</p>
        </header>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Job Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.vesselLocation}
                onChange={(e) => setFormData({ ...formData, vesselLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Gulf of Thailand"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Describe the job task in detail..."
              required
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '🔄 Analyzing with AI...' : '🤖 Analyze Job with AI'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold">❌ {error}</p>
          </div>
        )}

        {/* Results Section */}
        {jsaData && jsaData.jobSteps && (
          <div className="space-y-6">
            {/* Meta Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-800 mb-2">✅ Analysis Complete!</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📊 <strong>{jsaData.jobSteps.length}</strong> job steps identified</p>
                <p>🤖 Model: <strong>{jsaData._meta?.model}</strong></p>
                <p>💰 Cost: <strong>{jsaData._meta?.cost > 0 ? `$${jsaData._meta.cost.toFixed(4)}` : 'FREE'}</strong></p>
              </div>
            </div>

            {/* Job Steps */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Job Steps Analysis</h2>
                <button
                  onClick={handleExport}
                  className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                >
                  📄 Export to Word
                </button>
              </div>

              {jsaData.jobSteps.map((step: JobStep, index: number) => (
                <JobStepCard key={index} step={step} stepIndex={index} />
              ))}
            </div>

            {/* Export Button Bottom */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleExport}
                className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors shadow-lg"
              >
                📥 Download JSA Document
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
