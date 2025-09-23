import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { mockAlerts } from '../utils/mockData';

interface AlertsWidgetProps {
  onViewAll?: () => void;
}

const AlertsWidget: React.FC<AlertsWidgetProps> = ({ onViewAll }) => {
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'critical' && !alert.resolved);
  const allUnresolved = mockAlerts.filter(alert => !alert.resolved);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'warning':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      default:
        return 'bg-blue-100 border-blue-300 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
        {criticalAlerts.length > 0 && (
          <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {criticalAlerts.length}
          </div>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {allUnresolved.slice(0, 3).map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start space-x-3">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <div className="font-medium">{alert.title}</div>
                <div className="text-sm opacity-90 mt-1">{alert.description}</div>
              </div>
            </div>
          </div>
        ))}
        
        {allUnresolved.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">✅</div>
            <div>No active alerts</div>
          </div>
        )}
      </div>

      <button
        onClick={onViewAll}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px]"
      >
        View All Alerts ({allUnresolved.length})
      </button>
    </div>
  );
};

export default AlertsWidget;