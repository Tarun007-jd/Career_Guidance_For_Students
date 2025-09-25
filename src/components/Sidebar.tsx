import React from 'react';
import { Home, UserIcon, FileText, Search, Bot, Calendar, GraduationCap, FileUp as FileUser, Settings as SettingsIcon, HelpCircle } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, user }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const navigationItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home, color: 'text-blue-600' },
    { id: 'profile', label: t('profile_setup'), icon: UserIcon, color: 'text-green-600' },
    { id: 'quiz', label: t('career_quiz'), icon: FileText, color: 'text-purple-600' },
    { id: 'explorer', label: t('college_explorer'), icon: Search, color: 'text-indigo-600' },
    { id: 'assistant', label: t('ai_assistant'), icon: Bot, color: 'text-red-600' },
    { id: 'timeline', label: t('timeline_events'), icon: Calendar, color: 'text-orange-600' },
    { id: 'scholarships', label: t('scholarships'), icon: GraduationCap, color: 'text-yellow-600' },
    { id: 'resume', label: t('resume_builder'), icon: FileUser, color: 'text-pink-600' },
    { id: 'settings', label: t('settings'), icon: SettingsIcon, color: 'text-gray-600' },
    { id: 'help', label: t('help_support'), icon: HelpCircle, color: 'text-teal-600' },
  ];

  return (
    <div className="w-72 min-h-screen bg-gradient-to-br from-white/90 via-blue-50/80 to-teal-100/80 dark:from-gray-900/90 dark:via-blue-950/80 dark:to-teal-900/80 border-r border-gray-100 dark:border-gray-800 flex flex-col shadow-2xl transition-colors duration-300 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-xl transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-blue-700 to-teal-700' : 'bg-gradient-to-br from-blue-500 to-teal-400'}`}
          style={{ letterSpacing: '0.1em' }}>
          <span className="text-white drop-shadow-lg">CC</span>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-5 py-6 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left font-semibold text-base transition-all duration-200 group shadow-sm
                ${isActive
                  ? 'bg-gradient-to-r from-blue-100/80 to-teal-100/80 dark:from-blue-900/40 dark:to-teal-900/40 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700 scale-[1.03] shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-teal-50/80 dark:hover:from-blue-900/20 dark:hover:to-teal-900/20 hover:text-blue-900 dark:hover:text-white border border-transparent hover:scale-[1.02]'}
              `}
              style={{ boxShadow: isActive ? '0 4px 24px 0 rgba(0, 180, 216, 0.10)' : undefined }}
            >
              <IconComponent 
                className={`h-6 w-6 transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : item.color + ' dark:text-gray-400 group-hover:scale-105'}`} 
              />
              <span className={`font-semibold transition-all duration-200 ${isActive ? 'text-blue-800 dark:text-blue-200' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      {/* User Card */}
      <div className="px-5 py-6 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white/80 to-blue-50/60 dark:from-gray-900/80 dark:to-blue-950/40 rounded-b-2xl shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-700 dark:to-teal-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base">
              {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-gray-900 dark:text-white truncate">
              {user.fullName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('student')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;