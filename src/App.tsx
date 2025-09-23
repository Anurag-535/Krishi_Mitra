import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import FieldExplorer from './pages/FieldExplorer';
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
    </div>
  );
}

export default App;