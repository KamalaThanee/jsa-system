'use client';

import { Info } from 'lucide-react';
import { getRiskGuidance } from '@/lib/riskMatrix';

export default function RiskMatrixLegend() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Risk Assessment Matrix</h2>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 p-2 text-left font-semibold">
                Severity (S)
              </th>
              <th className="border border-gray-300 bg-gray-100 p-2 text-center">
                A<br />
                <span className="font-normal text-xs">Very Low<br />&gt;10 Years</span>
              </th>
              <th className="border border-gray-300 bg-gray-100 p-2 text-center">
                B<br />
                <span className="font-normal text-xs">Low<br />Annually</span>
              </th>
              <th className="border border-gray-300 bg-gray-100 p-2 text-center">
                C<br />
                <span className="font-normal text-xs">Medium<br />6 Monthly</span>
              </th>
              <th className="border border-gray-300 bg-gray-100 p-2 text-center">
                D<br />
                <span className="font-normal text-xs">High<br />Monthly</span>
              </th>
              <th className="border border-gray-300 bg-gray-100 p-2 text-center">
                E<br />
                <span className="font-normal text-xs">Very High<br />Daily</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 bg-gray-50">
                <strong>1 - Insignificant</strong>
                <div className="text-xs text-gray-600 mt-1">
                  Injury (onsite treatment)
                </div>
              </td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 bg-gray-50">
                <strong>2 - Minor</strong>
                <div className="text-xs text-gray-600 mt-1">
                  1st aid treatment
                </div>
              </td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-yellow-100 font-semibold">MED</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 bg-gray-50">
                <strong>3 - Serious</strong>
                <div className="text-xs text-gray-600 mt-1">
                  Recordable injury
                </div>
              </td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-green-100 font-semibold">LOW</td>
              <td className="border border-gray-300 p-2 text-center bg-yellow-100 font-semibold">MED</td>
              <td className="border border-gray-300 p-2 text-center bg-yellow-100 font-semibold">MED</td>
              <td className="border border-gray-300 p-2 text-center bg-yellow-100 font-semibold">MED</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 bg-gray-50">
                <strong>4 - Extensive</strong>
                <div className="text-xs text-gray-600 mt-1">
                  LTI (Lost Time Injury)
                </div>
              </td>
              <td className="border border-gray-300 p-2 text-center bg-yellow-100 font-semibold">MED</td>
              <td className="border border-gray-300 p-2 text-center bg-yellow-100 font-semibold">MED</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 bg-gray-50">
                <strong>5 - Fatality</strong>
              </td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
              <td className="border border-gray-300 p-2 text-center bg-red-100 font-semibold">HIGH</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Risk Level Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="font-bold text-green-800 mb-2">LOW RISK</div>
          <p className="text-sm text-green-700">{getRiskGuidance('LOW')}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="font-bold text-yellow-800 mb-2">MEDIUM RISK</div>
          <p className="text-sm text-yellow-700">{getRiskGuidance('MED')}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="font-bold text-red-800 mb-2">HIGH RISK</div>
          <p className="text-sm text-red-700">{getRiskGuidance('HIGH')}</p>
        </div>
      </div>

      {/* Abbreviations */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
        <div className="font-semibold text-gray-900 mb-2">Definitions:</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-700">
          <div><strong>S</strong> = Potential Severity</div>
          <div><strong>L</strong> = Likelihood of Occurrence</div>
          <div><strong>IR</strong> = Initial Risk</div>
          <div><strong>RR</strong> = Residual Risk</div>
        </div>
      </div>
    </div>
  );
}
