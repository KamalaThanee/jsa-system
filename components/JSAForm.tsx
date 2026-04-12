'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, Download, Sparkles } from 'lucide-react';
import { JSAData, JobStep } from '@/types';
import { calculateRisk } from '@/lib/riskMatrix';
import JobStepCard from './JobStepCard';
import RiskMatrixLegend from './RiskMatrixLegend';

export default function JSAForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jsaData, setJsaData] = useState<Partial<JSAData>>({
    vesselCode: '',
    vesselName: '',
    client: '',
    vesselLocation: '',
    jobDescription: '',
    date: new Date().toISOString().split('T')[0],
    jobSteps: [],
  });

  const handleAnalyze = async () => {
    if (!jsaData.jobDescription?.trim()) {
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
          jobDescription: jsaData.jobDescription,
          vesselType: 'Accommodation Work Barge',
          workLocation: jsaData.vesselLocation || 'Offshore',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();

      // Transform AI response to JobStep format
      const jobSteps: JobStep[] = result.jobSteps.map((step: any) => ({
        no: step.stepNumber,
        description: step.description,
        potentialHazards: step.hazards.map(
          (h: any) => `[${h.category}] ${h.hazard}: ${h.description}`
        ),
        initialRisk: {
          severity: step.initialSeverity,
          likelihood: step.initialLikelihood,
          riskLevel: calculateRisk(step.initialSeverity, step.initialLikelihood),
        },
        controlMeasures: step.controlMeasures,
        responsibility: step.responsibility,
        residualRisk: {
          severity: step.residualSeverity,
          likelihood: step.residualLikelihood,
          riskLevel: calculateRisk(step.residualSeverity, step.residualLikelihood),
        },
      }));

      setJsaData({ ...jsaData, jobSteps });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze job');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
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
      a.download = `JSA_${jsaData.jsaNumber || 'export'}_${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message || 'Failed to export document');
      console.error('Export error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Job Safety Analysis (JSA)</h1>
        <p className="text-blue-100">
          AI-Powered JSA System for Offshore Accommodation Work Barges
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vessel Code
            </label>
            <input
              type="text"
              value={jsaData.vesselCode || ''}
              onChange={(e) =>
                setJsaData({ ...jsaData, vesselCode: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., AWB-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vessel Name
            </label>
            <input
              type="text"
              value={jsaData.vesselName || ''}
              onChange={(e) =>
                setJsaData({ ...jsaData, vesselName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Pacific Endeavor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <input
              type="text"
              value={jsaData.client || ''}
              onChange={(e) =>
                setJsaData({ ...jsaData, client: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Chevron Thailand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vessel Location
            </label>
            <input
              type="text"
              value={jsaData.vesselLocation || ''}
              onChange={(e) =>
                setJsaData({ ...jsaData, vesselLocation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Gulf of Thailand"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description *
          </label>
          <textarea
            value={jsaData.jobDescription || ''}
            onChange={(e) =>
              setJsaData({ ...jsaData, jobDescription: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the work to be performed in detail (e.g., Crane lifting operation for cargo transfer from supply vessel to barge deck)"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !jsaData.jobDescription?.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Job with AI
            </>
          )}
        </button>
      </div>

      {/* Risk Matrix Legend */}
      <RiskMatrixLegend />

      {/* Job Steps */}
      {jsaData.jobSteps && jsaData.jobSteps.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Job Steps Analysis ({jsaData.jobSteps.length})
            </h2>
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export to Word
            </button>
          </div>

          {jsaData.jobSteps.map((step, index) => (
            <JobStepCard key={index} step={step} />
          ))}
        </div>
      )}
    </div>
  );
}
