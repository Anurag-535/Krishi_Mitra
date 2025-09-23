import React, { useState } from 'react';
import { 
  Brain, 
  Satellite, 
  Thermometer, 
  ArrowRight, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  Eye,
  Zap,
  Droplets,
  Wind,
  Sun,
  Bug,
  Leaf,
  Target,
  Camera,
  BarChart3,
  MapPin,
  Clock,
  Cpu,
  Settings
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [selectedField, setSelectedField] = useState('field-1');

  // Real-time monitoring data
  const realTimeStats = [
    {
      icon: Activity,
      label: 'Fields Monitored',
      value: '12',
      trend: '+2 this week',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: '3',
      trend: '2 critical',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: TrendingUp,
      label: 'Avg Health Score',
      value: '87%',
      trend: '+5% vs last month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Target,
      label: 'AI Accuracy',
      value: '94.2%',
      trend: 'Improving',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  // Environmental monitoring
  const environmentalData = [
    { icon: Thermometer, label: 'Temperature', value: '24°C', status: 'optimal' },
    { icon: Droplets, label: 'Soil Moisture', value: '68%', status: 'good' },
    { icon: Wind, label: 'Wind Speed', value: '12 km/h', status: 'optimal' },
    { icon: Sun, label: 'Solar Radiation', value: '850 W/m²', status: 'high' }
  ];

  // Spectral analysis data
  const spectralIndices = [
    { name: 'NDVI', value: 0.78, status: 'excellent', description: 'Vegetation health' },
    { name: 'EVI', value: 0.65, status: 'good', description: 'Enhanced vegetation' },
    { name: 'SAVI', value: 0.72, status: 'good', description: 'Soil adjusted vegetation' },
    { name: 'Chlorophyll', value: 42.3, status: 'optimal', description: 'μg/cm²' }
  ];

  // AI Predictions
  const aiPredictions = [
    {
      icon: Bug,
      title: 'Pest Outbreak Risk',
      probability: 23,
      timeframe: '7 days',
      severity: 'low',
      description: 'Aphid population may increase',
      action: 'Monitor closely'
    },
    {
      icon: Droplets,
      title: 'Water Stress Risk',
      probability: 67,
      timeframe: '3 days',
      severity: 'medium',
      description: 'Irrigation recommended',
      action: 'Schedule irrigation'
    },
    {
      icon: Leaf,
      title: 'Disease Risk',
      probability: 15,
      timeframe: '10 days',
      severity: 'low',
      description: 'Fungal infection possible',
      action: 'Preventive spraying'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'optimal':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'caution':
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability < 30) return 'text-green-600 bg-green-100';
    if (probability < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              Krishi Mitra AI
            </h1>
            <p className="text-xl text-gray-600">Advanced Agricultural Intelligence Platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium">Live Monitoring</span>
            </div>
            <button 
              onClick={() => onNavigate('settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {realTimeStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-700 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.trend}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Spectral Analysis Panel */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Satellite className="w-5 h-5 mr-2 text-blue-600" />
                Spectral Analysis
              </h2>
              <button 
                onClick={() => onNavigate('field-explorer')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {spectralIndices.map((index, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">{index.name}</div>
                    <div className="text-sm text-gray-600">{index.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{index.value}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(index.status)}`}>
                      {index.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('field-explorer')}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
            >
              <Camera className="w-4 h-4 mr-2" />
              View Spectral Maps
            </button>
          </div>

          {/* Environmental Monitoring */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-green-600" />
                Environmental Data
              </h2>
              <div className="flex items-center text-green-600 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                Live
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {environmentalData.map((data, i) => {
                const Icon = data.icon;
                return (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-center">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-bold text-lg text-gray-900">{data.value}</div>
                    <div className="text-sm text-gray-600 mb-1">{data.label}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(data.status)}`}>
                      {data.status}
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => onNavigate('reports')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Detailed Reports
            </button>
          </div>

          {/* AI Predictions Panel */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-purple-600" />
                AI Predictions
              </h2>
              <div className="flex items-center text-purple-600 text-sm">
                <Zap className="w-4 h-4 mr-1" />
                Updated
              </div>
            </div>

            <div className="space-y-4">
              {aiPredictions.map((prediction, i) => {
                const Icon = prediction.icon;
                return (
                  <div key={i} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-2 text-gray-600" />
                        <div className="font-semibold text-gray-900">{prediction.title}</div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getProbabilityColor(prediction.probability)}`}>
                        {prediction.probability}%
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{prediction.description}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">in {prediction.timeframe}</span>
                      <span className="font-medium text-blue-600">{prediction.action}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => onNavigate('alerts')}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
            >
              <Brain className="w-4 h-4 mr-2" />
              View All Predictions
            </button>
          </div>
        </div>

        {/* Quick Action Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Actions & Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('field-explorer')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Field Explorer</h3>
                <p className="text-blue-100">View hyperspectral maps and zone analysis</p>
                <ArrowRight className="w-5 h-5 mx-auto mt-4" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('alerts')}
              className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Alert Center</h3>
                <p className="text-red-100">Monitor critical issues and recommendations</p>
                <ArrowRight className="w-5 h-5 mx-auto mt-4" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Reports & Trends</h3>
                <p className="text-green-100">Analyze historical data and patterns</p>
                <ArrowRight className="w-5 h-5 mx-auto mt-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;