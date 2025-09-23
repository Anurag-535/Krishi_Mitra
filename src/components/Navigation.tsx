import React from 'react';
import { Home, Satellite, Bell, BarChart3, Settings, Brain, Leaf } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'field-explorer', label: 'Field Explorer', icon: Satellite },
    { id: 'soil-advisor', label: 'Soil Advisor', icon: Leaf },
    { id: 'alerts', label: 'Alert Center', icon: Bell },
    { id: 'reports', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Farm Management', icon: Settings }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Krishi Mitra AI</h1>
              <p className="text-xs text-gray-600">Agricultural Intelligence</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* User Section */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-gray-900">Farm Manager</div>
              <div className="text-xs text-gray-600">Online</div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">FM</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;