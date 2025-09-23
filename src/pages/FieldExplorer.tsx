import React, { useState } from 'react';
import { 
  Satellite, 
  Camera, 
  Map, 
  Layers, 
  Zap, 
  Target, 
  Activity,
  AlertTriangle,
  Eye,
  Download,
  Settings,
  Filter,
  Calendar,
  BarChart3,
  Info,
  MapPin,
  Crosshair,
  Scan,
  Brain
} from 'lucide-react';

const FieldExplorer: React.FC = () => {
  const [selectedField, setSelectedField] = useState('field-1');
  const [selectedLayer, setSelectedLayer] = useState('ndvi');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'satellite' | 'analysis' | 'zones'>('analysis');

  const fields = [
    { id: 'field-1', name: 'North Field', area: '25.6 ha', crop: 'Wheat', status: 'healthy' },
    { id: 'field-2', name: 'South Field', area: '18.3 ha', crop: 'Corn', status: 'caution' },
    { id: 'field-3', name: 'East Field', area: '32.1 ha', crop: 'Soybeans', status: 'critical' }
  ];

  const spectralLayers = [
    { id: 'ndvi', name: 'NDVI', description: 'Vegetation Health', color: 'from-red-500 to-green-500' },
    { id: 'evi', name: 'EVI', description: 'Enhanced Vegetation', color: 'from-purple-500 to-yellow-500' },
    { id: 'savi', name: 'SAVI', description: 'Soil Adjusted', color: 'from-blue-500 to-green-500' },
    { id: 'chlorophyll', name: 'Chlorophyll', description: 'Chlorophyll Content', color: 'from-yellow-500 to-green-500' },
    { id: 'water', name: 'Water Content', description: 'Moisture Levels', color: 'from-brown-500 to-blue-500' },
    { id: 'stress', name: 'Stress Index', description: 'Plant Stress', color: 'from-green-500 to-red-500' }
  ];

  const currentFieldData = {
    'field-1': {
      ndvi: 0.78,
      evi: 0.65,
      savi: 0.72,
      chlorophyll: 42.3,
      waterContent: 68,
      stressIndex: 0.23,
      zones: [
        { id: 'zone-1', name: 'Zone A', health: 85, area: '8.5 ha', status: 'healthy', alerts: 0 },
        { id: 'zone-2', name: 'Zone B', health: 78, area: '9.2 ha', status: 'good', alerts: 1 },
        { id: 'zone-3', name: 'Zone C', health: 92, area: '7.9 ha', status: 'excellent', alerts: 0 }
      ],
      anomalies: [
        { id: 'anomaly-1', type: 'Water Stress', severity: 'medium', location: 'Zone B', confidence: 87 },
        { id: 'anomaly-2', type: 'Nutrient Deficiency', severity: 'low', location: 'Zone A', confidence: 73 }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-700 bg-green-100 border-green-200';
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'caution': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Satellite className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Field Explorer</h1>
              <p className="text-gray-600">Hyperspectral imaging and zone analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Field Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Map className="w-5 h-5 mr-2 text-green-600" />
                Select Field
              </h3>
              <div className="space-y-3">
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedField === field.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{field.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(field.status)}`}>
                        {field.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {field.crop} • {field.area}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-purple-600" />
                View Mode
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'satellite', name: 'Satellite View', icon: Satellite },
                  { id: 'analysis', name: 'Spectral Analysis', icon: Brain },
                  { id: 'zones', name: 'Zone Management', icon: Target }
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        viewMode === mode.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {mode.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spectral Layers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-orange-600" />
                Spectral Layers
              </h3>
              <div className="space-y-2">
                {spectralLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedLayer === layer.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{layer.name}</span>
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${layer.color}`}></div>
                    </div>
                    <div className="text-sm text-gray-600">{layer.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Map/Analysis View */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Scan className="w-6 h-6 mr-2 text-blue-600" />
                    {viewMode === 'satellite' && 'Satellite Imagery'}
                    {viewMode === 'analysis' && `Spectral Analysis - ${spectralLayers.find(l => l.id === selectedLayer)?.name}`}
                    {viewMode === 'zones' && 'Zone Management'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Simulated Map Area */}
              <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-lg">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      {viewMode === 'satellite' && <Satellite className="w-8 h-8 text-white" />}
                      {viewMode === 'analysis' && <Brain className="w-8 h-8 text-white" />}
                      {viewMode === 'zones' && <Target className="w-8 h-8 text-white" />}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {viewMode === 'satellite' && 'High-Resolution Satellite View'}
                      {viewMode === 'analysis' && 'Hyperspectral Analysis Map'}
                      {viewMode === 'zones' && 'Field Zone Mapping'}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {viewMode === 'satellite' && 'Latest satellite imagery with 1m resolution'}
                      {viewMode === 'analysis' && `${spectralLayers.find(l => l.id === selectedLayer)?.description} visualization`}
                      {viewMode === 'zones' && 'Interactive zone-based field management'}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Crosshair className="w-4 h-4 mr-1" />
                        Click to analyze
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        GPS coordinates
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Simulated zones overlay for zone view */}
                {viewMode === 'zones' && currentFieldData[selectedField as keyof typeof currentFieldData] && (
                  <div className="absolute inset-4">
                    <div className="grid grid-cols-3 gap-2 h-full">
                      {currentFieldData[selectedField as keyof typeof currentFieldData].zones.map((zone, i) => (
                        <button
                          key={zone.id}
                          onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                          className={`rounded-lg border-2 transition-all ${
                            selectedZone === zone.id
                              ? 'border-blue-500 bg-blue-100 bg-opacity-50'
                              : 'border-white bg-white bg-opacity-30 hover:bg-opacity-50'
                          }`}
                        >
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{zone.name}</div>
                              <div className={`text-sm px-2 py-1 rounded-full mt-1 ${getStatusColor(zone.status)}`}>
                                {zone.health}%
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Data Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Spectral Indices */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Spectral Indices
                </h3>
                
                {currentFieldData[selectedField as keyof typeof currentFieldData] && (
                  <div className="space-y-4">
                    {[
                      { name: 'NDVI', value: currentFieldData[selectedField as keyof typeof currentFieldData].ndvi, max: 1 },
                      { name: 'EVI', value: currentFieldData[selectedField as keyof typeof currentFieldData].evi, max: 1 },
                      { name: 'SAVI', value: currentFieldData[selectedField as keyof typeof currentFieldData].savi, max: 1 },
                      { name: 'Chlorophyll', value: currentFieldData[selectedField as keyof typeof currentFieldData].chlorophyll, max: 50, unit: 'μg/cm²' }
                    ].map((index, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{index.name}</span>
                          <span className="text-sm text-gray-600">
                            {index.value}{index.unit || ''}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(index.value / index.max) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Zone Details or Anomalies */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  {selectedZone ? 'Zone Details' : 'Detected Anomalies'}
                </h3>
                
                {selectedZone && currentFieldData[selectedField as keyof typeof currentFieldData] ? (
                  <div>
                    {(() => {
                      const zone = currentFieldData[selectedField as keyof typeof currentFieldData].zones.find(z => z.id === selectedZone);
                      return zone ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">{zone.name}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Area:</span>
                                <span className="ml-2 font-medium">{zone.area}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Health:</span>
                                <span className="ml-2 font-medium">{zone.health}%</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Status:</span>
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(zone.status)}`}>
                                  {zone.status}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Alerts:</span>
                                <span className="ml-2 font-medium">{zone.alerts}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                ) : (
                  currentFieldData[selectedField as keyof typeof currentFieldData] && (
                    <div className="space-y-3">
                      {currentFieldData[selectedField as keyof typeof currentFieldData].anomalies.map((anomaly) => (
                        <div key={anomaly.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{anomaly.type}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(anomaly.severity)}`}>
                              {anomaly.severity}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Location: {anomaly.location}
                          </div>
                          <div className="text-sm text-gray-600">
                            Confidence: {anomaly.confidence}%
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldExplorer;