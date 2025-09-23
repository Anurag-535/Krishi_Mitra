import React, { useState } from 'react';
import { Eye, Droplets, Bug, MapPin, Calendar } from 'lucide-react';
import FarmMap from '../components/FarmMap';
import { mockFields } from '../utils/mockData';

const FieldExplorer: React.FC = () => {
  const [selectedField, setSelectedField] = useState('1');
  const [activeLayer, setActiveLayer] = useState('health');
  const [timelineValue, setTimelineValue] = useState(50);

  const field = mockFields.find(f => f.id === selectedField);

  const dataLayers = [
    { id: 'health', label: 'Health', icon: Eye, color: 'green' },
    { id: 'water', label: 'Water Stress', icon: Droplets, color: 'blue' },
    { id: 'pest', label: 'Pest Risk', icon: Bug, color: 'orange' },
    { id: 'sensors', label: 'Sensors', icon: MapPin, color: 'purple' }
  ];

  const getLayerButtonColor = (layerId: string, color: string) => {
    const isActive = activeLayer === layerId;
    const colors = {
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200',
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Field Explorer</h1>
          <p className="text-gray-600">Detailed view of field conditions and data</p>
        </div>
        
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-lg font-medium min-h-[44px] min-w-[200px]"
        >
          {mockFields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name} - {field.crop}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Data Layer Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Data Layers</h3>
          
          <div className="space-y-3">
            {dataLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg font-medium transition-colors min-h-[44px] ${
                    getLayerButtonColor(layer.id, layer.color)
                  }`}
                >
                  <Icon size={20} />
                  <span>{layer.label}</span>
                </button>
              );
            })}
          </div>

          {/* Field Info */}
          {field && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">{field.name} Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Crop:</span>
                  <span className="font-medium">{field.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span>Area:</span>
                  <span className="font-medium">{field.area} acres</span>
                </div>
                <div className="flex justify-between">
                  <span>Health Score:</span>
                  <span className={`font-medium ${
                    field.healthScore >= 85 ? 'text-green-600' :
                    field.healthScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {field.healthScore}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium capitalize ${
                    field.status === 'healthy' ? 'text-green-600' :
                    field.status === 'caution' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {field.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {field?.name} - {dataLayers.find(l => l.id === activeLayer)?.label} View
                </h3>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Dec 21, 2024</span>
                </div>
              </div>
            </div>
            
            <div className="h-[500px] relative">
              <FarmMap 
                selectedField={selectedField}
                showZones={true}
              />
              
              {/* Zone Info Overlay */}
              {field && (
                <div className="absolute top-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg max-w-xs">
                  <h4 className="font-semibold mb-2">Zone Information</h4>
                  <div className="space-y-2">
                    {field.zones.map((zone) => (
                      <div key={zone.id} className="text-sm">
                        <div className="font-medium">{zone.name}</div>
                        <div className="text-gray-600">
                          {activeLayer === 'health' && `Health: ${zone.status}`}
                          {activeLayer === 'water' && `Water Stress: ${zone.waterStress}%`}
                          {activeLayer === 'pest' && `Pest Risk: ${zone.pestRisk}%`}
                          {activeLayer === 'sensors' && `Soil Moisture: ${zone.soilMoisture}%`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Historical Timeline */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Historical Data Timeline
                </label>
                <span className="text-sm text-gray-600">
                  {Math.round((timelineValue / 100) * 365)} days ago
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={timelineValue}
                onChange={(e) => setTimelineValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Today</span>
                <span>6 months ago</span>
                <span>1 year ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldExplorer;