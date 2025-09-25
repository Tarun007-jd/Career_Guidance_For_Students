import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, Phone, Mail, Book } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HelpSupport: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All Topics' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'colleges', name: 'College Information' },
    { id: 'scholarships', name: 'Scholarships' },
    { id: 'technical', name: 'Technical Issues' }
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I update my profile information?',
      answer: 'Go to Profile Setup section and edit your details. Click Save Profile to update your information.',
      category: 'account'
    },
    {
      id: '2',
      question: 'How can I find colleges in Coimbatore?',
      answer: 'Use the College Explorer section to search and filter colleges by location, type, and other criteria.',
      category: 'colleges'
    },
    {
      id: '3',
      question: 'What scholarships are available for engineering students?',
      answer: 'Check the Scholarships section for merit-based and need-based scholarships. We have information about government and private scholarships.',
      category: 'scholarships'
    },
    {
      id: '4',
      question: 'How do I contact Karpagam College?',
      answer: 'You can contact Karpagam College at +91-422-2611146 or visit their website at www.kce.ac.in',
      category: 'colleges'
    },
    {
      id: '5',
      question: 'Can I change the app theme?',
      answer: 'Yes! Go to Settings > Appearance to change between light, dark, and system themes.',
      category: 'technical'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-4 bg-gradient-to-br from-teal-400/80 to-pink-500/80 dark:from-teal-800/80 dark:to-pink-900/80 rounded-2xl shadow-lg">
            <HelpCircle className="h-8 w-8 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('help_support')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Get help with using Career Corrector</p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
          <MessageCircle className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Live Chat</h3>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6">Chat with our support team</p>
          <button className="w-full bg-gradient-to-br from-blue-500 to-teal-500 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all">Start Chat</button>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
          <Phone className="h-10 w-10 text-green-500 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Phone Support</h3>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6">Call us for immediate help</p>
          <a href="tel:+91-9876543210" className="block w-full bg-gradient-to-br from-green-500 to-teal-500 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:from-green-600 hover:to-teal-600 transition-all">Call Now</a>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center hover:scale-[1.025] hover:shadow-2xl transition-all duration-200">
          <Mail className="h-10 w-10 text-purple-500 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Email Support</h3>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6">Send us your questions</p>
          <a href="mailto:support@careercorrector.com" className="block w-full bg-gradient-to-br from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all">Send Email</a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white shadow-lg transition-all text-lg"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-6 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white shadow-lg transition-all text-lg"
          >
            {faqCategories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        {/* FAQ List */}
        <div className="space-y-6">
          {filteredFaqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="flex items-center justify-between p-6 bg-gradient-to-br from-gray-50/80 to-teal-100/80 dark:from-gray-700/80 dark:to-teal-900/40 rounded-xl cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">{faq.question}</span>
                <svg className="h-6 w-6 text-teal-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-6 text-gray-600 dark:text-gray-400 border-l-4 border-teal-500 ml-4 mt-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-14 w-14 text-gray-400 mx-auto mb-6" />
            <p className="text-lg text-gray-500 dark:text-gray-400">No FAQs found matching your search.</p>
          </div>
        )}
      </div>

      {/* Additional Resources */}
      <div className="mt-12 bg-gradient-to-br from-teal-100/80 to-pink-100/80 dark:from-teal-900/40 dark:to-pink-900/40 border border-teal-200 dark:border-teal-800 rounded-2xl p-10 shadow-lg">
        <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-200 mb-6">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="#" className="flex items-center space-x-4 p-5 bg-white/80 dark:bg-gray-800/80 rounded-2xl hover:scale-[1.025] hover:shadow-2xl transition-all">
            <Book className="h-7 w-7 text-teal-600" />
            <div>
              <div className="font-bold text-gray-900 dark:text-white text-lg">User Guide</div>
              <div className="text-base text-gray-600 dark:text-gray-400">Complete guide to using Career Corrector</div>
            </div>
          </a>
          <a href="#" className="flex items-center space-x-4 p-5 bg-white/80 dark:bg-gray-800/80 rounded-2xl hover:scale-[1.025] hover:shadow-2xl transition-all">
            <MessageCircle className="h-7 w-7 text-teal-600" />
            <div>
              <div className="font-bold text-gray-900 dark:text-white text-lg">Community Forum</div>
              <div className="text-base text-gray-600 dark:text-gray-400">Connect with other students</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;