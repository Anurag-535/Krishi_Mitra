import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, MapPin, Check, Eye } from 'lucide-react';
import { mockAlerts } from '../utils/mockData';

const AlertsCenter: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  );

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      default:
        return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string, resolved: boolean) => {
    const opacity = resolved ? 'opacity-50' : '';
    switch (severity) {
      case 'critical':
        return `bg-red-50 border-red-300 ${opacity}`;
      case 'warning':
        return `bg-orange-50 border-orange-300 ${opacity}`;
      default:
        return `bg-blue-50 border-blue-300 ${opacity}`;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const markAsResolved = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const unresolvedCount = alerts.filter(alert => !alert.resolved).length;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts Center</h1>
        <p className="text-gray-600">
          {unresolvedCount} unresolved alerts requiring attention
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { key: 'all', label: 'All Alerts', count: alerts.length },
          { key: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
          { key: 'warning', label: 'Warning', count: alerts.filter(a => a.severity === 'warning').length },
          { key: 'info', label: 'Info', count: alerts.filter(a => a.severity === 'info').length }
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
              filter === key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'All alerts have been resolved' : `No ${filter} alerts at this time`}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all ${
                getSeverityColor(alert.severity, alert.resolved)
              } ${alert.resolved ? 'transform scale-[0.98]' : ''}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getSeverityIcon(alert.severity)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        alert.resolved ? 'text-gray-600 line-through' : 'text-gray-900'
                      }`}>
                        {alert.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          getSeverityBadge(alert.severity)
                        }`}>
                          {alert.severity}
                        </span>
                        {alert.resolved && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {formatTimestamp(alert.timestamp)}
                    </div>
                  </div>
                  
                  <p className={`text-gray-700 mb-4 ${alert.resolved ? 'opacity-60' : ''}`}>
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {alert.field}{alert.zone ? `, ${alert.zone}` : ''}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors min-h-[44px]">
                      <Eye size={16} />
                      <span>View on Map</span>
                    </button>
                    
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors min-h-[44px]">
                      Get Details
                    </button>
                    
                    {!alert.resolved && (
                      <button
                        onClick={() => markAsResolved(alert.id)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors min-h-[44px]"
                      >
                        <Check size={16} />
                        <span>Mark as Resolved</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsCenter;