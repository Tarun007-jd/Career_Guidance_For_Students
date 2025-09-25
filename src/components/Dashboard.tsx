import React from 'react';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { t } = useLanguage();

  const stats = [
    { label: 'Career Matches', value: '12', icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'College Options', value: '85', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Scholarships', value: '23', icon: Award, color: 'bg-yellow-500' },
    { label: 'Connections', value: '156', icon: Users, color: 'bg-purple-500' },
  ];

  return (
  <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('welcome_back')}, {user.fullName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('career_journey')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-7 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-transform transform hover:-translate-y-2 hover:shadow-2xl group overflow-hidden"
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              <div className="absolute -top-6 -right-6 opacity-20 group-hover:opacity-40 transition-all duration-300">
                <svg width="100" height="100">
                  <defs>
                    <radialGradient id={`grad${index}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50" fill={`url(#grad${index})`} />
                </svg>
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-lg">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl shadow-lg ${stat.color} bg-gradient-to-br from-white/30 to-transparent`}> 
                  <IconComponent className="h-7 w-7 text-white drop-shadow" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-base text-gray-700 dark:text-gray-300">Completed Career Assessment</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-base text-gray-700 dark:text-gray-300">Applied to 3 scholarships</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-base text-gray-700 dark:text-gray-300">Updated resume</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700 dark:text-gray-300">IIT JEE Application</span>
              <span className="text-base font-semibold text-red-600 dark:text-red-400 animate-pulse">2 days left</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700 dark:text-gray-300">Merit Scholarship</span>
              <span className="text-base font-semibold text-orange-600 dark:text-orange-400">1 week left</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700 dark:text-gray-300">College Fair Registration</span>
              <span className="text-base font-semibold text-green-600 dark:text-green-400">2 weeks left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;