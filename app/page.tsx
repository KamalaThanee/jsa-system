import JSAForm from '@/components/JSAForm';
import EnergyWheelDisplay from '@/components/EnergyWheelDisplay';
import { Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen pb-12">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JSA System</h1>
                <p className="text-xs text-gray-600">Offshore Safety Analysis Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Powered by Claude AI</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <JSAForm />
      </div>

      {/* Energy Wheel Section */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <EnergyWheelDisplay />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About JSA System</h3>
              <p className="text-sm text-gray-600">
                AI-powered Job Safety Analysis platform designed specifically for offshore
                accommodation work barges, utilizing Chevron Energy Wheel methodology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI-powered hazard identification</li>
                <li>• Chevron Energy Wheel framework</li>
                <li>• Automated risk assessment</li>
                <li>• Word document export</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Safety Standards</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ISO 45001 aligned</li>
                <li>• Offshore industry best practices</li>
                <li>• Company risk matrix compliant</li>
                <li>• Continuous improvement focused</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} JSA System. Built for offshore safety excellence.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
