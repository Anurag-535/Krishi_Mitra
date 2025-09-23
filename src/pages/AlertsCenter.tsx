import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  MapPin, 
  Check, 
  Eye,
  Brain,
  Bug,
  Droplets,
  Thermometer,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Target,
  Activity,
  Bell,
  Filter,
  Search,
  Calendar,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';

interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'ai_prediction' | 'environmental' | 'spectral_anomaly' | 'sensor_malfunction';
  title: string;
  description: string;
  field: string;
  zone?: string;
  timestamp: Date;
  resolved: boolean;
  confidence?: number;
  actionRequired: boolean;
  recommendedActions: string[];
  aiModel?: string;
}

const AlertsCenter: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'ai_prediction' | 'environmental' | 'spectral_anomaly' | 'sensor_malfunction'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Advanced alerts with AI predictions and environmental monitoring
  const alerts: Alert[] = [
    {
      id: 'alert-1',
      severity: 'critical',
      type: 'ai_prediction',
      title: 'Pest Outbreak Prediction - High Risk',
      description: 'LSTM model predicts 89% probability of aphid outbreak in the next 48 hours',
      field: 'North Field',
      zone: 'Zone B',
      timestamp: new Date('2024-12-21T08:30:00'),
      resolved: false,
      confidence: 89,
      actionRequired: true,
      recommendedActions: [
        'Apply targeted pesticide treatment',
        'Increase monitoring frequency',
        'Deploy pheromone traps'
      ],
      aiModel: 'LSTM-Pest-v2.1'
    },
    {
      id: 'alert-2',
      severity: 'high',
      type: 'spectral_anomaly',
      title: 'Water Stress Detected',
      description: 'Hyperspectral analysis shows water stress indicators (NDVI drop of 15%)',
      field: 'South Field',
      zone: 'Zone A',
      timestamp: new Date('2024-12-21T07:15:00'),
      resolved: false,
      confidence: 92,
      actionRequired: true,
      recommendedActions: [
        'Schedule irrigation within 24 hours',
        'Check soil moisture sensors',
        'Evaluate irrigation system'
      ]
    },
    {
      id: 'alert-3',
      severity: 'medium',
      type: 'environmental',
      title: 'Temperature Spike Alert',
      description: 'Air temperature exceeded optimal range for 3 consecutive hours',
      field: 'East Field',
      timestamp: new Date('2024-12-21T06:45:00'),
      resolved: false,
      actionRequired: false,
      recommendedActions: [
        'Monitor crop stress indicators',
        'Consider evening irrigation'
      ]
    },
    {
      id: 'alert-4',
      severity: 'high',
      type: 'ai_prediction',
      title: 'Disease Risk - Fungal Infection',
      description: 'CNN model detected early symptoms of powdery mildew with 76% confidence',
      field: 'North Field',
      zone: 'Zone C',
      timestamp: new Date('2024-12-21T05:20:00'),
      resolved: false,
      confidence: 76,
      actionRequired: true,
      recommendedActions: [
        'Apply preventive fungicide',
        'Improve air circulation',
        'Reduce leaf wetness duration'
      ],
      aiModel: 'CNN-Disease-v3.2'
    },
    {
      id: 'alert-5',
      severity: 'medium',
      type: 'sensor_malfunction',
      title: 'Soil Moisture Sensor Offline',
      description: 'Sensor SM-003 in East Field has not reported data for 6 hours',
      field: 'East Field',
      zone: 'Zone B',
      timestamp: new Date('2024-12-20T22:10:00'),
      resolved: false,
      actionRequired: true,
      recommendedActions: [
        'Check sensor connectivity',
        'Replace sensor battery',
        'Verify data transmission'
      ]
    },
    {
      id: 'alert-6',
      severity: 'low',
      type: 'spectral_anomaly',
      title: 'Chlorophyll Content Variation',
      description: 'Minor variations in chlorophyll content detected in spectral analysis',
      field: 'South Field',
      zone: 'Zone C',
      timestamp: new Date('2024-12-20T18:30:00'),
      resolved: true,
      confidence: 68,
      actionRequired: false,
      recommendedActions: [
        'Continue monitoring',
        'Consider nutrient supplementation'
      ]
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.severity === filter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.field.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesType && matchesSearch;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'high':
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case 'medium':
        return <Info className="w-6 h-6 text-yellow-600" />;
      case 'low':
        return <Info className="w-6 h-6 text-blue-600" />;
      default:
        return <Info className="w-6 h-6 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai_prediction':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'environmental':
        return <Thermometer className="w-5 h-5 text-green-600" />;
      case 'spectral_anomaly':
        return <Eye className="w-5 h-5 text-blue-600" />;
      case 'sensor_malfunction':
        return <Zap className="w-5 h-5 text-red-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string, resolved: boolean) => {
    const opacity = resolved ? 'opacity-60' : '';
    switch (severity) {
      case 'critical':
        return `bg-red-50 border-red-300 ${opacity}`;
      case 'high':
        return `bg-orange-50 border-orange-300 ${opacity}`;
      case 'medium':
        return `bg-yellow-50 border-yellow-300 ${opacity}`;
      case 'low':
        return `bg-blue-50 border-blue-300 ${opacity}`;
      default:
        return `bg-gray-50 border-gray-300 ${opacity}`;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-orange-600 text-white';
      case 'medium':
        return 'bg-yellow-600 text-white';
      case 'low':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ai_prediction': return 'AI Prediction';
      case 'environmental': return 'Environmental';
      case 'spectral_anomaly': return 'Spectral Analysis';
      case 'sensor_malfunction': return 'Sensor Issue';
      default: return 'General';
    }
  };

  const activeAlerts = alerts.filter(a => !a.resolved);
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const highCount = activeAlerts.filter(a => a.severity === 'high').length;
  const aiPredictionCount = activeAlerts.filter(a => a.type === 'ai_prediction').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Alert Center</h1>
              <p className="text-gray-600">AI-powered monitoring and predictions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{activeAlerts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Critical</p>
                <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">High Priority</p>
                <p className="text-3xl font-bold text-orange-600">{highCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">AI Predictions</p>
                <p className="text-3xl font-bold text-purple-600">{aiPredictionCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Severity:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="ai_prediction">AI Predictions</option>
                  <option value="environmental">Environmental</option>
                  <option value="spectral_anomaly">Spectral Analysis</option>
                  <option value="sensor_malfunction">Sensor Issues</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600">All systems are operating normally or no alerts match your filters.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-200 hover:shadow-xl ${getSeverityColor(alert.severity, alert.resolved)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-semibold ${alert.resolved ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        {alert.type && (
                          <span className="flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            {getTypeIcon(alert.type)}
                            <span className="ml-1">{getTypeLabel(alert.type)}</span>
                          </span>
                        )}
                      </div>
                      
                      <p className={`text-gray-600 mb-3 ${alert.resolved ? 'opacity-60' : ''}`}>
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {alert.field}{alert.zone && ` - ${alert.zone}`}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {alert.timestamp.toLocaleString()}
                        </span>
                        {alert.confidence && (
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {alert.confidence}% confidence
                          </span>
                        )}
                        {alert.aiModel && (
                          <span className="flex items-center">
                            <Brain className="w-4 h-4 mr-1" />
                            {alert.aiModel}
                          </span>
                        )}
                      </div>

                      {alert.recommendedActions.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions:</h4>
                          <ul className="space-y-1">
                            {alert.recommendedActions.map((action, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <Target className="w-3 h-3 mr-2 text-blue-500" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {alert.actionRequired && !alert.resolved && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        Action Required
                      </span>
                    )}
                    {alert.resolved && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Resolved
                      </span>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsCenter;