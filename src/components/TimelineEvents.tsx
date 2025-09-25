import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'deadline' | 'exam' | 'event' | 'application';
  priority: 'high' | 'medium' | 'low';
  description: string;
  daysLeft: number;
}

const TimelineEvents: React.FC = () => {
  const { t } = useLanguage();

  const events: Event[] = [
    {
      id: '1',
      title: 'JEE Main Application Deadline',
      date: '2025-01-15',
      time: '11:59 PM',
      location: 'Online',
      type: 'deadline',
      priority: 'high',
      description: 'Last date to submit JEE Main application form for April session',
      daysLeft: 2
    },
    {
      id: '2',
      title: 'NEET Exam',
      date: '2025-05-05',
      time: '2:00 PM',
      location: 'Various Centers',
      type: 'exam',
      priority: 'high',
      description: 'National Eligibility cum Entrance Test for medical courses',
      daysLeft: 112
    },
    {
      id: '3',
      title: 'College Fair - Coimbatore',
      date: '2025-01-25',
      time: '10:00 AM',
      location: 'CODISSIA Trade Fair Complex',
      type: 'event',
      priority: 'medium',
      description: 'Meet representatives from top colleges and universities',
      daysLeft: 12
    },
    {
      id: '4',
      title: 'Scholarship Application - Merit Based',
      date: '2025-02-01',
      time: '11:59 PM',
      location: 'Online',
      type: 'application',
      priority: 'medium',
      description: 'Apply for merit-based scholarships for undergraduate programs',
      daysLeft: 19
    },
    {
      id: '5',
      title: 'TNEA Counselling',
      date: '2025-06-15',
      time: '9:00 AM',
      location: 'Chennai',
      type: 'event',
      priority: 'high',
      description: 'Tamil Nadu Engineering Admissions counselling process',
      daysLeft: 153
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700';
      case 'low':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'exam':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-green-500" />;
      case 'application':
        return <MapPin className="h-5 w-5 text-purple-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  const sortedEvents = events.sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-4 bg-gradient-to-br from-orange-400/80 to-pink-500/80 dark:from-orange-800/80 dark:to-pink-900/80 rounded-2xl shadow-lg">
            <Calendar className="h-8 w-8 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('timeline_events')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Track important deadlines and career milestones</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-red-100/80 to-pink-100/80 dark:from-red-900/40 dark:to-pink-900/40 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-9 w-9 text-red-500" />
            <div>
              <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                {events.filter(e => e.priority === 'high' && e.daysLeft <= 7).length}
              </div>
              <div className="text-base text-red-600 dark:text-red-400 font-semibold">Urgent Deadlines</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <Clock className="h-9 w-9 text-blue-500" />
            <div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {events.filter(e => e.type === 'exam').length}
              </div>
              <div className="text-base text-blue-600 dark:text-blue-400 font-semibold">Upcoming Exams</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-100/80 to-teal-100/80 dark:from-green-900/40 dark:to-teal-900/40 border border-green-200 dark:border-green-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <Calendar className="h-9 w-9 text-green-500" />
            <div>
              <div className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                {events.filter(e => e.type === 'event').length}
              </div>
              <div className="text-base text-green-600 dark:text-green-400 font-semibold">Career Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Upcoming Events</h2>
        <div className="space-y-10">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {index < sortedEvents.length - 1 && (
                <div className="absolute left-7 top-16 w-1 h-20 bg-gradient-to-b from-pink-300/60 to-indigo-300/60 dark:from-pink-900/40 dark:to-indigo-900/40 rounded-full"></div>
              )}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white/90 dark:bg-gray-700/90 border-4 border-pink-200 dark:border-pink-900 rounded-full flex items-center justify-center shadow-lg">
                  {getTypeIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border mb-3 shadow-sm ${getPriorityColor(event.priority)}`}>
                    {event.daysLeft === 0 ? 'Today' : event.daysLeft === 1 ? 'Tomorrow' : `${event.daysLeft} days left`}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                  <div className="flex flex-wrap items-center gap-6 text-base text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="px-6 py-3 text-pink-600 dark:text-pink-400 border-2 border-pink-500 dark:border-pink-400 rounded-2xl font-bold text-base shadow-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200">
                    Add Reminder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineEvents;