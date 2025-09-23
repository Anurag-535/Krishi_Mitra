import React, { useState } from 'react';
import { MapPin, Sprout, Radio, Bell, Edit2, Plus, Trash2 } from 'lucide-react';
import { mockFields, mockSensors } from '../utils/mockData';

const FarmManagement: React.FC = () => {
  const [activeSection, setActiveSection] = useState('fields');
  const [notificationSettings, setNotificationSettings] = useState({
    sms: true,
    email: true,
    inApp: true,
    critical: true,
    warnings: true,
    info: false
  });

  const sections = [
    { id: 'fields', label: 'My Fields', icon: MapPin },
    { id: 'crops', label: 'My Crops', icon: Sprout },
    { id: 'sensors', label: 'My Sensors', icon: Radio },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'low_battery':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSensorStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return '🟢';
      case 'offline':
        return '🔴';
      case 'low_battery':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const renderFieldsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Field Management</h3>
        <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]">
          <Plus size={20} />
          <span>Add Field</span>
        </button>
      </div>

      {/* Map-based Field Editor */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Field Boundaries</h4>
        <div className="h-64 bg-green-50 rounded-lg border-2 border-dashed border-green-300 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
            <p>Interactive map for drawing/editing field boundaries</p>
            <p className="text-sm">Click and drag to define field areas</p>
          </div>
        </div>
      </div>

      {/* Fields List */}
      <div className="grid gap-4">
        {mockFields.map((field) => (
          <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-lg">{field.name}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <span className="text-sm text-gray-600">Area</span>
                    <p className="font-medium">{field.area} acres</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Crop</span>
                    <p className="font-medium">{field.crop}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Health Score</span>
                    <p className={`font-medium ${
                      field.healthScore >= 85 ? 'text-green-600' :
                      field.healthScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {field.healthScore}%
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <p className={`font-medium capitalize ${
                      field.status === 'healthy' ? 'text-green-600' :
                      field.status === 'caution' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {field.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg min-h-[44px] min-w-[44px]">
                  <Edit2 size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg min-h-[44px] min-w-[44px]">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCropsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Crop Management</h3>
        <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]">
          <Plus size={20} />
          <span>Add Crop</span>
        </button>
      </div>

      <div className="grid gap-4">
        {mockFields.map((field) => (
          <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{field.crop}</h4>
                  <p className="text-gray-600">{field.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600">Planted</div>
                <div className="font-medium">
                  {new Date(field.plantingDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg min-h-[44px] min-w-[44px]">
                  <Edit2 size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg min-h-[44px] min-w-[44px]">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSensorsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Sensor Management</h3>
        <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]">
          <Plus size={20} />
          <span>Add Sensor</span>
        </button>
      </div>

      <div className="grid gap-4">
        {mockSensors.map((sensor) => (
          <div key={sensor.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Radio className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{sensor.name}</h4>
                  <p className="text-gray-600 capitalize">{sensor.type.replace('_', ' ')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Current Value</div>
                  <div className="font-semibold text-lg">
                    {sensor.value}{sensor.unit}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Status</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSensorStatusColor(sensor.status)}`}>
                    {getSensorStatusIcon(sensor.status)} {sensor.status.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg min-h-[44px] min-w-[44px]">
                    <Edit2 size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg min-h-[44px] min-w-[44px]">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Delivery Methods</h4>
        <div className="space-y-4">
          {[
            { key: 'sms', label: 'SMS Text Messages', description: 'Receive alerts via text message' },
            { key: 'email', label: 'Email Notifications', description: 'Receive alerts via email' },
            { key: 'inApp', label: 'In-App Notifications', description: 'Show alerts in the application' }
          ].map((method) => (
            <label key={method.key} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={notificationSettings[method.key as keyof typeof notificationSettings]}
                onChange={(e) => setNotificationSettings(prev => ({
                  ...prev,
                  [method.key]: e.target.checked
                }))}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{method.label}</div>
                <div className="text-sm text-gray-600">{method.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Alert Types</h4>
        <div className="space-y-4">
          {[
            { key: 'critical', label: 'Critical Alerts', description: 'Urgent issues requiring immediate attention', color: 'red' },
            { key: 'warnings', label: 'Warning Alerts', description: 'Important issues that should be addressed', color: 'yellow' },
            { key: 'info', label: 'Information Alerts', description: 'General updates and maintenance notifications', color: 'blue' }
          ].map((alertType) => (
            <label key={alertType.key} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={notificationSettings[alertType.key as keyof typeof notificationSettings]}
                onChange={(e) => setNotificationSettings(prev => ({
                  ...prev,
                  [alertType.key]: e.target.checked
                }))}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className={`w-4 h-4 rounded-full ${
                alertType.color === 'red' ? 'bg-red-500' :
                alertType.color === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{alertType.label}</div>
                <div className="text-sm text-gray-600">{alertType.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]">
        Save Notification Settings
      </button>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'fields':
        return renderFieldsSection();
      case 'crops':
        return renderCropsSection();
      case 'sensors':
        return renderSensorsSection();
      case 'notifications':
        return renderNotificationsSection();
      default:
        return renderFieldsSection();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Management</h1>
        <p className="text-gray-600">Manage your fields, crops, sensors, and settings</p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors min-h-[44px] ${
                activeSection === section.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={20} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Content */}
      <div>
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default FarmManagement;