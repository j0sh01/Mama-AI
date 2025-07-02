import React, { useState, useEffect, createContext } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PatientQueue } from './components/PatientQueue/PatientQueue';
import { Resources } from './components/Resources/Resources';
import { RiskAssessmentComponent } from './components/RiskAssessment/RiskAssessment';
import { Rooms } from './components/Rooms/Rooms';
import { Inventory } from './components/Inventory/Inventory';
import { Costs } from './components/Costs/Costs';
import { History } from './components/History/History';
import { AIAssistant } from './components/AIAssistant/AIAssistant';
import { Button } from './components/UI/Button';
import { Bot } from 'lucide-react';
import { AuthPage } from './components/AuthPage';

export const AuthContext = createContext<{ token: string | null; username: string | null; logout: () => void }>({ token: null, username: null, logout: () => {} });

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('access'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username'));

  useEffect(() => {
    if (token) localStorage.setItem('access', token);
    else localStorage.removeItem('access');
    if (username) localStorage.setItem('username', username);
    else localStorage.removeItem('username');
  }, [token, username]);

  const handleAuthSuccess = (tok: string, user: string) => {
    setToken(tok);
    setUsername(user);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'patients':
        return <PatientQueue />;
      case 'resources':
        return <Resources />;
      case 'risk':
        return <RiskAssessmentComponent />;
      case 'rooms':
        return <Rooms />;
      case 'inventory':
        return <Inventory />;
      case 'costs':
        return <Costs />;
      case 'history':
        return <History />;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  if (!token) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <AuthContext.Provider value={{ token, username, logout }}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout} username={username} />
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
        {/* Floating AI Assistant Button */}
        {!isAIAssistantOpen && (
          <Button
            variant="primary"
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow z-40"
            onClick={() => setIsAIAssistantOpen(true)}
          >
            <Bot className="w-6 h-6" />
          </Button>
        )}
        {/* AI Assistant */}
        <AIAssistant 
          isOpen={isAIAssistantOpen} 
          onClose={() => setIsAIAssistantOpen(false)} 
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;