import { useState } from 'react';
import Navigation from './components/Navigation';
import KrishiGPT from './components/GeminiChatBot';
import Dashboard from './pages/Dashboard';
import FieldExplorer from './pages/FieldExplorer';
import SoilAdvisor from './pages/SoilAdvisor';
import AlertsCenter from './pages/AlertsCenter';
import ReportsTrends from './pages/ReportsTrends';
import FarmManagement from './pages/FarmManagement';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'field-explorer':
        return <FieldExplorer />;
      case 'soil-advisor':
        return <SoilAdvisor />;
      case 'alerts':
        return <AlertsCenter />;
      case 'reports':
        return <ReportsTrends />;
      case 'settings':
        return <FarmManagement />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      <main className="py-6">
        {renderCurrentPage()}
      </main>
  <KrishiGPT />
    </div>
  );
}

export default App;