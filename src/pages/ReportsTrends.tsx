import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  Mail, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Target,
  Zap,
  Droplets,
  Thermometer,
  Leaf,
  Bug,
  Clock,
  Filter,
  Settings,
  FileText,
  Share,
  RefreshCw
} from 'lucide-react';

const ReportsTrends: React.FC = () => {
  const [selectedField, setSelectedField] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('comprehensive');
  const [chartType, setChartType] = useState('line');

  const fields = [
    { id: 'all', name: 'All Fields' },
    { id: 'field-1', name: 'North Field' },
    { id: 'field-2', name: 'South Field' },
    { id: 'field-3', name: 'East Field' }
  ];

  const reportTypes = [
    { id: 'comprehensive', label: 'Comprehensive Analysis', icon: BarChart3 },
    { id: 'crop_health', label: 'Crop Health Trends', icon: Leaf },
    { id: 'environmental', label: 'Environmental Data', icon: Thermometer },
    { id: 'ai_predictions', label: 'AI Predictions Report', icon: Zap },
    { id: 'pest_disease', label: 'Pest & Disease Analysis', icon: Bug }
  ];

  const dateRanges = [
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: '90days', label: 'Last 3 Months' },
    { id: '365days', label: 'Last Year' }
  ];

  // Mock comprehensive data
  const kpiData = [
    {
      title: 'Average Field Health',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Leaf,
      color: 'green'
    },
    {
      title: 'Pest Risk Reduction',
      value: '23%',
      change: '-8.1%',
      trend: 'down',
      icon: Bug,
      color: 'blue'
    },
    {
      title: 'Water Usage Efficiency',
      value: '94.1%',
      change: '+3.7%',
      trend: 'up',
      icon: Droplets,
      color: 'cyan'
    },
    {
      title: 'AI Prediction Accuracy',
      value: '91.8%',
      change: '+2.3%',
      trend: 'up',
      icon: Zap,
      color: 'purple'
    }
  ];

  // Mock trend data
  const healthTrendData = [
    { month: 'Jul', value: 82 },
    { month: 'Aug', value: 85 },
    { month: 'Sep', value: 83 },
    { month: 'Oct', value: 88 },
    { month: 'Nov', value: 86 },
    { month: 'Dec', value: 87 }
  ];

  const environmentalData = [
    { metric: 'Soil Moisture', value: 68, optimal: '60-75%', status: 'good' },
    { metric: 'Temperature', value: 24, optimal: '20-26°C', status: 'optimal' },
    { metric: 'Humidity', value: 72, optimal: '65-75%', status: 'good' },
    { metric: 'Soil pH', value: 6.8, optimal: '6.0-7.0', status: 'optimal' }
  ];

  const aiInsights = [
    {
      category: 'Crop Health',
      insight: 'NDVI values show 12% improvement in vegetation density compared to last season',
      confidence: 94,
      impact: 'High'
    },
    {
      category: 'Pest Management',
      insight: 'Early intervention reduced aphid population by 78% using predictive modeling',
      confidence: 89,
      impact: 'High'
    },
    {
      category: 'Water Management',
      insight: 'Precision irrigation saved 1,240 gallons while maintaining optimal soil moisture',
      confidence: 96,
      impact: 'Medium'
    },
    {
      category: 'Disease Prevention',
      insight: 'Fungal disease risk reduced by 45% through proactive treatment scheduling',
      confidence: 87,
      impact: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'caution': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive farm performance insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Field Selection</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {fields.map(field => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {dateRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {new Date().toLocaleString()}
              </span>
              <span className="flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                Real-time data
              </span>
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh Data
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${kpi.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                  </div>
                  <div className={`flex items-center text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                <div className="text-gray-600 text-sm">{kpi.title}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Health Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-blue-600" />
                Field Health Trend
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Simulated Chart Area */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border">
              <div className="text-center">
                <LineChart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Health Trend Chart</h4>
                <p className="text-gray-600 mb-4">6-month health score progression</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  {healthTrendData.map((point, i) => (
                    <div key={i} className="text-center">
                      <div className="font-semibold text-gray-900">{point.month}</div>
                      <div className="text-blue-600">{point.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-green-600" />
              Environmental Status
            </h3>
            
            <div className="space-y-4">
              {environmentalData.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{item.metric}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {item.value}{item.metric === 'Temperature' ? '°C' : item.metric === 'Soil pH' ? '' : '%'}
                  </div>
                  <div className="text-sm text-gray-600">Optimal: {item.optimal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            AI-Powered Insights & Recommendations
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{insight.category}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(insight.impact)}`}>
                      {insight.impact} Impact
                    </span>
                    <span className="text-sm text-gray-600">{insight.confidence}% confidence</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{insight.insight}</p>
                
                {/* Confidence bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>AI Confidence</span>
                    <span>{insight.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-600" />
            Recommended Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">Immediate Actions</h4>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Schedule irrigation for Zone B in South Field</li>
                <li>• Apply preventive fungicide in North Field Zone C</li>
                <li>• Check soil moisture sensor in East Field</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">This Week</h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Optimize irrigation schedule based on weather forecast</li>
                <li>• Deploy additional sensors in East Field</li>
                <li>• Review pest trap effectiveness</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Long-term Planning</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Plan crop rotation for next season</li>
                <li>• Evaluate soil amendment requirements</li>
                <li>• Upgrade to next-gen hyperspectral sensors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTrends;