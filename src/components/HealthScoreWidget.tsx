import React from 'react';
import { mockFields } from '../utils/mockData';

const HealthScoreWidget: React.FC = () => {
  const totalArea = mockFields.reduce((sum, field) => sum + field.area, 0);
  const weightedHealthScore = mockFields.reduce(
    (sum, field) => sum + (field.healthScore * field.area),
    0
  ) / totalArea;

  const getHealthEmoji = (score: number) => {
    if (score >= 85) return '😊';
    if (score >= 70) return '😐';
    return '😟';
  };

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthStatus = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Health Score</h3>
      
      <div className="text-center">
        <div className="text-6xl mb-4">{getHealthEmoji(weightedHealthScore)}</div>
        <div className={`text-4xl font-bold mb-2 ${getHealthColor(weightedHealthScore)}`}>
          {Math.round(weightedHealthScore)}%
        </div>
        <div className={`text-lg font-medium mb-4 ${getHealthColor(weightedHealthScore)}`}>
          {getHealthStatus(weightedHealthScore)}
        </div>
        
        <div className="bg-gray-200 rounded-full h-4 mb-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              weightedHealthScore >= 85 ? 'bg-green-500' :
              weightedHealthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${weightedHealthScore}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-600">
          Based on {mockFields.length} fields ({totalArea} acres)
        </div>
      </div>
    </div>
  );
};

export default HealthScoreWidget;