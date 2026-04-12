'use client';

import { JobStep } from '@/types';
import { getRiskColor, getSeverityDescription, getLikelihoodDescription } from '@/lib/riskMatrix';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface JobStepCardProps {
  step: JobStep;
}

export default function JobStepCard({ step }: JobStepCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            {step.no}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{step.description}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Responsibility: <span className="font-medium">{step.responsibility}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Potential Hazards */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-gray-900">Potential Hazards</h4>
          </div>
          <div className="space-y-2">
            {step.potentialHazards.map((hazard, idx) => (
              <div
                key={idx}
                className="bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-gray-700"
              >
                {hazard}
              </div>
            ))}
          </div>
        </div>

        {/* Initial Risk Assessment */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Initial Risk (Before Controls)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">Severity</div>
              <div className="font-semibold text-gray-900">
                {step.initialRisk.severity} -{' '}
                {getSeverityDescription(step.initialRisk.severity).split('-')[0].trim()}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">Likelihood</div>
              <div className="font-semibold text-gray-900">
                {step.initialRisk.likelihood} -{' '}
                {getLikelihoodDescription(step.initialRisk.likelihood).split('-')[0].trim()}
              </div>
            </div>
            <div className={`rounded-lg p-3 border ${getRiskColor(step.initialRisk.riskLevel)}`}>
              <div className="text-xs mb-1 opacity-80">Risk Level</div>
              <div className="font-bold text-lg">{step.initialRisk.riskLevel}</div>
            </div>
          </div>
        </div>

        {/* Control Measures */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Control Measures / Mitigation</h4>
          </div>
          <div className="space-y-2">
            {step.controlMeasures.map((measure, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-sm text-gray-700 flex items-start gap-2"
              >
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{measure}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Residual Risk Assessment */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Residual Risk (After Controls)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">Severity</div>
              <div className="font-semibold text-gray-900">
                {step.residualRisk.severity} -{' '}
                {getSeverityDescription(step.residualRisk.severity).split('-')[0].trim()}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">Likelihood</div>
              <div className="font-semibold text-gray-900">
                {step.residualRisk.likelihood} -{' '}
                {getLikelihoodDescription(step.residualRisk.likelihood).split('-')[0].trim()}
              </div>
            </div>
            <div className={`rounded-lg p-3 border ${getRiskColor(step.residualRisk.riskLevel)}`}>
              <div className="text-xs mb-1 opacity-80">Risk Level</div>
              <div className="font-bold text-lg">{step.residualRisk.riskLevel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
