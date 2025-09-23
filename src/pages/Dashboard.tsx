import React from 'react';
import { Camera, TestTube, Lightbulb, ArrowRight, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Camera,
      title: 'Field Analysis',
      description: 'Upload field photos for instant AI-powered crop health analysis',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      onClick: () => onNavigate('field-explorer')
    },
    {
      icon: TestTube,
      title: 'Soil Testing',
      description: 'Comprehensive soil nutrient analysis and monitoring',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      onClick: () => onNavigate('reports')
    },
    {
      icon: Lightbulb,
      title: 'Smart Recommendations',
      description: 'Personalized crop and fertilizer suggestions',
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
      onClick: () => onNavigate('alerts')
    }
  ];

  const quickStats = [
    {
      icon: MapPin,
      label: 'Total Fields',
      value: '3',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: '2',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: TrendingUp,
      label: 'Avg Health Score',
      value: '83%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-16">
        <div className="text-center mb-16">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-4xl">🌾</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="text-sm">🚀</div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Agriculture
            <span className="block text-green-600">Revolution</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI-Powered Farm Management & Crop Optimization for Modern Farming
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={feature.onClick}
                className={`${feature.color} rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-md group-hover:shadow-lg transition-shadow">
                    <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <div className="flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('field-explorer')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-h-[60px] min-w-[200px]"
            >
              Explore Your Farm
            </button>
            
            <button
              onClick={() => onNavigate('alerts')}
              className="bg-white hover:bg-gray-50 text-green-600 font-bold py-4 px-8 rounded-2xl text-lg border-2 border-green-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-h-[60px] min-w-[200px]"
            >
              View Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              About Green Valley Farm Management
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our AI-powered platform revolutionizes farming by providing real-time insights, 
              predictive analytics, and personalized recommendations to optimize crop yields 
              and reduce environmental impact. Join thousands of farmers already using smart 
              agriculture technology to transform their operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;