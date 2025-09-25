import { useState } from 'react';
import Login from './components/Login';
import type { Language } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProfileSetup from './components/ProfileSetup';
import CareerQuiz from './components/CareerQuiz';
import CollegeExplorer from './components/CollegeExplorer';
import AICareerAssistant from './components/AICareerAssistant';
import TimelineEvents from './components/TimelineEvents';
import Scholarships from './components/Scholarships';
import ResumeBuilder from './components/ResumeBuilder';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';
import Header from './components/Header';
import { User } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<User>({
    id: '1',
    fullName: 'Roshini ks',
    email: 'roshiniks@example.com',
    phoneNumber: '+91-9876543210',
    avatar: '',
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false,
        newsletters: true,
      },
      privacy: {
        profileVisibility: 'public',
        dataSharing: false,
        analytics: true,
      },
      appearance: {
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
      }
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'profile':
        return <ProfileSetup user={user} setUser={setUser} />;
      case 'quiz':
        return <CareerQuiz />;
      case 'explorer':
        return <CollegeExplorer />;
      case 'assistant':
        return <AICareerAssistant />;
      case 'timeline':
        return <TimelineEvents />;
      case 'scholarships':
        return <Scholarships />;
      case 'resume':
        return <ResumeBuilder user={user} />;
      case 'settings':
        return <Settings user={user} setUser={setUser} />;
      case 'help':
        return <HelpSupport />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={(name: string) => {
      setUser(u => ({ ...u, fullName: name || u.fullName }));
      setIsLoggedIn(true);
    }} />;
  }
  return (
    <ThemeProvider initialTheme={user.preferences.appearance.theme}>
      <LanguageProvider initialLanguage={user.preferences.appearance.language as Language}>
        <FontSizeProvider initialFontSize={user.preferences.appearance.fontSize}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300 animate-fade-in">
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              user={user}
            />
            <div className="flex-1 flex flex-col">
              <Header 
                user={user} 
                isLoggedIn={isLoggedIn} 
                onLogout={() => {
                  setIsLoggedIn(false);
                  setUser(u => ({ ...u, fullName: 'Roshini ks' }));
                }}
              />
              <main className="flex-1 p-6">
                {renderContent()}
              </main>
            </div>
          </div>
        </FontSizeProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;