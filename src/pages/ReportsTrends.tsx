import React, { useState } from 'react';
import { Calendar, Download, Mail, TrendingUp, TrendingDown } from 'lucide-react';
import { mockFields } from '../utils/mockData';

const ReportsTrends: React.FC = () => {
  const [selectedField, setSelectedField] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('health');

  // Mock data for trends
  const generateTrendData = (field: string, days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000),
      value: Math.floor(Math.random() * 40) + 60 + Math.sin(i / 10) * 10
    }));
  };

  const trendData = generateTrendData(selectedField, dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90);

  const reportTypes = [
    { id: 'health', label: 'Field Health', unit: '%', color: 'green' },
    { id: 'moisture', label: 'Soil Moisture', unit: '%', color: 'blue' },
    { id: 'temperature', label: 'Temperature', unit: '°F', color: 'orange' }
  ];

  const dateRanges = [
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' },
    { id: '90days', label: '90 Days' }
  ];

  const currentValue = trendData[trendData.length - 1]?.value || 0;
  const previousValue = trendData[trendData.length - 2]?.value || 0;
  const trend = currentValue - previousValue;
  const trendPercentage = previousValue ? ((trend / previousValue) * 100).toFixed(1) : '0';

  const maxValue = Math.max(...trendData.map(d => d.value));
  const minValue = Math.min(...trendData.map(d => d.value));

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Trends</h1>
        <p className="text-gray-600">Analyze your farm's performance over time</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Field</label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 min-h-[44px]"
            >
              <option value="all">All Fields</option>
              {mockFields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 min-h-[44px]"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 min-h-[44px]"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]">
            <Download size={20} />
            <span>Download PDF</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]">
            <Mail size={20} />
            <span>Email Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentValue.toFixed(1)}{reportTypes.find(t => t.id === reportType)?.unit}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              trend >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {trend >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
          <div className="mt-2">
            <span className={`text-sm ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend >= 0 ? '+' : ''}{trendPercentage}% from yesterday
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Period High</p>
              <p className="text-2xl font-bold text-green-600">
                {maxValue.toFixed(1)}{reportTypes.find(t => t.id === reportType)?.unit}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Period Low</p>
              <p className="text-2xl font-bold text-red-600">
                {minValue.toFixed(1)}{reportTypes.find(t => t.id === reportType)?.unit}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {reportTypes.find(t => t.id === reportType)?.label} Trend
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{dateRanges.find(r => r.id === dateRange)?.label}</span>
          </div>
        </div>
        
        <div className="h-80 relative">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={300 - (y * 3)}
                x2="800"
                y2={300 - (y * 3)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Trend line */}
            <polyline
              fill="none"
              stroke={reportTypes.find(t => t.id === reportType)?.color === 'green' ? '#22c55e' : 
                     reportTypes.find(t => t.id === reportType)?.color === 'blue' ? '#3b82f6' : '#f97316'}
              strokeWidth="3"
              points={trendData.map((point, index) => {
                const x = (index / (trendData.length - 1)) * 800;
                const y = 300 - ((point.value / 100) * 300);
                return `${x},${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {trendData.map((point, index) => {
              const x = (index / (trendData.length - 1)) * 800;
              const y = 300 - ((point.value / 100) * 300);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={reportTypes.find(t => t.id === reportType)?.color === 'green' ? '#22c55e' : 
                        reportTypes.find(t => t.id === reportType)?.color === 'blue' ? '#3b82f6' : '#f97316'}
                />
              );
            })}
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 mt-2">
            <span>{trendData[0]?.date.toLocaleDateString()}</span>
            <span>{trendData[Math.floor(trendData.length / 2)]?.date.toLocaleDateString()}</span>
            <span>{trendData[trendData.length - 1]?.date.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Field Comparison */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Field Comparison</h3>
        
        <div className="space-y-4">
          {mockFields.map((field) => (
            <div key={field.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{field.name}</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {field.healthScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      field.healthScore >= 85 ? 'bg-green-500' :
                      field.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${field.healthScore}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {field.area} acres
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsTrends;