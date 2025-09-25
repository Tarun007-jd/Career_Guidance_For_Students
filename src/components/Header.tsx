import React from 'react';
import { Search, Bell } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  user: User;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, isLoggedIn, onLogout }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <header className="bg-gradient-to-br from-white/90 via-blue-50/80 to-teal-100/80 dark:from-gray-900/90 dark:via-blue-950/80 dark:to-teal-900/80 border-b border-gray-100 dark:border-gray-800 px-10 py-7 shadow-2xl backdrop-blur-2xl transition-all duration-500">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-6">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-extrabold text-3xl shadow-2xl transition-all duration-300 border-4 border-white/40 dark:border-blue-900/40 ${isDark ? 'bg-gradient-to-br from-blue-700 to-teal-700' : 'bg-gradient-to-br from-blue-500 to-teal-400'} hover:scale-105 hover:shadow-blue-200/40 dark:hover:shadow-blue-900/40`}
            style={{ letterSpacing: '0.1em' }}>
            <span className="text-white drop-shadow-lg tracking-widest">CC</span>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-lg bg-white/60 dark:bg-gray-900/60 px-4 py-2 rounded-2xl shadow-md backdrop-blur-md">
            {t('career_corrector')}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-12">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-400 h-6 w-6 group-focus-within:text-blue-500 group-hover:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full pl-16 pr-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-xl text-lg transition-all group-hover:shadow-2xl group-focus-within:shadow-blue-200/40"
            />
          </div>
        </div>

        {/* Notification and User Card */}
        <div className="flex items-center space-x-8">
          <button className="relative p-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 shadow-xl hover:scale-110 hover:shadow-blue-200/40 dark:hover:shadow-blue-900/40 transition-all group border border-gray-200 dark:border-gray-700">
            <Bell className="h-7 w-7 text-blue-500 group-hover:text-teal-500 transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-md">
              3
            </span>
          </button>
          <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-100/80 to-teal-100/80 dark:from-blue-900/40 dark:to-teal-900/40 px-6 py-4 rounded-2xl shadow-2xl border border-blue-200/40 dark:border-blue-900/40 backdrop-blur-xl hover:scale-105 hover:shadow-blue-200/40 dark:hover:shadow-blue-900/40 transition-all">
            <div className="text-right mr-2">
              <div className="text-lg font-extrabold text-gray-900 dark:text-white drop-shadow truncate max-w-[160px]">{user.fullName}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('student')}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-700 dark:to-teal-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white/40 dark:border-blue-900/40">
              <span className="text-white font-extrabold text-lg">
                {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="ml-4 px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-extrabold text-lg shadow-xl hover:from-blue-700 hover:to-teal-600 hover:scale-105 hover:shadow-blue-200/40 dark:hover:shadow-blue-900/40 transition-all border-2 border-blue-300/40 dark:border-blue-900/40 backdrop-blur-xl"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;