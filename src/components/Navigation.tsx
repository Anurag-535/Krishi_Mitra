import React from 'react';
import { Home, Map, AlertTriangle, TrendingUp, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'field-explorer', label: 'Fields', icon: Map },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌾</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Green Valley Farm</h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;