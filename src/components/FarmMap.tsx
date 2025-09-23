import React, { useState } from 'react';
import { mockFields } from '../utils/mockData';

interface FarmMapProps {
  onFieldClick?: (fieldId: string) => void;
  selectedField?: string;
  showZones?: boolean;
}

const FarmMap: React.FC<FarmMapProps> = ({ onFieldClick, selectedField, showZones = false }) => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500 border-green-600';
      case 'caution':
        return 'bg-yellow-500 border-yellow-600';
      case 'critical':
        return 'bg-red-500 border-red-600';
      default:
        return 'bg-gray-400 border-gray-500';
    }
  };

  return (
    <div className="w-full h-full bg-green-50 rounded-lg border-2 border-green-200 overflow-hidden relative">
      <div className="absolute inset-0 p-6">
        <div className="grid grid-cols-2 gap-4 h-full">
          {mockFields.map((field, index) => (
            <div
              key={field.id}
              className={`relative rounded-lg border-4 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                getStatusColor(field.status)
              } ${
                selectedField === field.id ? 'ring-4 ring-blue-400' : ''
              } ${
                hoveredField === field.id ? 'transform scale-105 shadow-lg' : ''
              }`}
              onMouseEnter={() => setHoveredField(field.id)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => onFieldClick?.(field.id)}
              style={{
                gridRow: index === 2 ? 'span 1' : 'auto',
                gridColumn: index === 2 ? 'span 2' : 'auto'
              }}
            >
              <div className="text-center text-white">
                <h3 className="font-bold text-lg sm:text-xl">{field.name}</h3>
                <p className="text-sm opacity-90">{field.crop}</p>
                <p className="text-xs opacity-80">{field.area} acres</p>
                {showZones && field.zones.length > 0 && (
                  <div className="mt-2 flex justify-center space-x-1">
                    {field.zones.map((zone) => (
                      <div
                        key={zone.id}
                        className={`w-3 h-3 rounded-full border ${getStatusColor(zone.status).replace('bg-', 'bg-opacity-80 bg-')}`}
                        title={`${zone.name}: ${zone.status}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {hoveredField === field.id && (
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-lg p-2 text-xs text-gray-800">
                  <div>Health: {field.healthScore}%</div>
                  <div>Status: {field.status}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmMap;