import React from 'react';
import { Info, Eye, Layers, Satellite, TrendingUp } from 'lucide-react';

interface SatelliteDataInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SatelliteDataInfo: React.FC<SatelliteDataInfoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Satellite className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Sentinel-2 Satellite Data Guide</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* What is Sentinel-2 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                What is Sentinel-2?
              </h3>
              <p className="text-gray-700 mb-3">
                Sentinel-2 is a European Space Agency (ESA) mission consisting of two identical satellites 
                that capture high-resolution optical imagery of Earth's land surfaces, coastal areas, and inland waters.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>10-meter spatial resolution for key agricultural bands</li>
                <li>5-day revisit time when both satellites are operational</li>
                <li>13 spectral bands covering visible to short-wave infrared</li>
                <li>Free and open data policy for all users</li>
              </ul>
            </div>

            {/* Spectral Indices */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Agricultural Spectral Indices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">NDVI</h4>
                  <p className="text-sm text-green-700">Normalized Difference Vegetation Index</p>
                  <p className="text-xs text-green-600 mt-1">Measures vegetation health and biomass</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">NDWI</h4>
                  <p className="text-sm text-blue-700">Normalized Difference Water Index</p>
                  <p className="text-xs text-blue-600 mt-1">Detects water content in vegetation</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">EVI</h4>
                  <p className="text-sm text-yellow-700">Enhanced Vegetation Index</p>
                  <p className="text-xs text-yellow-600 mt-1">Reduces atmospheric effects on NDVI</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800">SAVI</h4>
                  <p className="text-sm text-purple-700">Soil Adjusted Vegetation Index</p>
                  <p className="text-xs text-purple-600 mt-1">Minimizes soil brightness influence</p>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                How to Use the Map
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
                    <Layers className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Layer Control</p>
                    <p className="text-sm text-gray-600">Use the layers panel (top-right) to switch between satellite, terrain, and topographic base maps</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Spectral Analysis</p>
                    <p className="text-sm text-gray-600">Select different spectral indices to analyze crop health, water stress, and soil conditions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                    <Satellite className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Field Selection</p>
                    <p className="text-sm text-gray-600">Choose different fields from the dropdown to view location-specific satellite data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agricultural Benefits</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Monitor crop growth and health over time</li>
                <li>• Detect water stress and irrigation needs</li>
                <li>• Identify pest infestations and disease outbreaks</li>
                <li>• Optimize fertilizer application timing</li>
                <li>• Assess field variability for precision agriculture</li>
                <li>• Track harvest readiness and yield estimation</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};