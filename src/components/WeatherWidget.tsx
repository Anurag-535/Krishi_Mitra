import React from 'react';
import { mockWeather } from '../utils/mockData';

const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        🌤️ 5-Day Forecast
      </h3>
      
      <div className="space-y-3">
        {mockWeather.map((day, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
            index === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{day.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{day.date}</div>
                <div className="text-sm text-gray-600">{day.condition}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {day.temperature.high}°/{day.temperature.low}°
              </div>
              <div className="text-sm text-blue-600">
                💧 {day.precipitation}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;