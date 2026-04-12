'use client';

import { useState } from 'react';
import { ENERGY_WHEEL } from '@/lib/energyWheel';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function EnergyWheelDisplay() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Chevron Energy Wheel - Hazard Categories
        </h2>
        <p className="text-sm text-gray-600">
          Click on each category to view specific hazards and examples
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ENERGY_WHEEL.map((item) => {
          const isExpanded = expandedCategories.has(item.category);
          
          return (
            <div
              key={item.category}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleCategory(item.category)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                style={{ borderLeft: `4px solid ${item.color}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-gray-900">{item.category}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
                  {/* Hazards */}
                  <div>
                    <div className="text-xs font-semibold text-gray-700 uppercase mb-2">
                      Potential Hazards
                    </div>
                    <div className="space-y-1">
                      {item.hazards.map((hazard, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-700 bg-white rounded px-2 py-1 border border-gray-200"
                        >
                          • {hazard}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <div className="text-xs font-semibold text-gray-700 uppercase mb-2">
                      Common Examples
                    </div>
                    <div className="space-y-1">
                      {item.examples.map((example, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-600 bg-white rounded px-2 py-1 border border-gray-200"
                        >
                          ✓ {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{ENERGY_WHEEL.length}</div>
            <div className="text-xs text-gray-600 mt-1">Energy Categories</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {ENERGY_WHEEL.reduce((sum, item) => sum + item.hazards.length, 0)}
            </div>
            <div className="text-xs text-gray-600 mt-1">Total Hazards</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">
              {ENERGY_WHEEL.reduce((sum, item) => sum + item.examples.length, 0)}
            </div>
            <div className="text-xs text-gray-600 mt-1">Work Examples</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-xs text-gray-600 mt-1">Offshore Coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
}
