import React, { useState } from 'react';
import { GraduationCap, Search, Filter, DollarSign, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  type: string;
  description: string;
  applicationLink: string;
  requirements: string[];
}

const Scholarships: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'Merit Scholarship for Engineering Students',
      provider: 'Tamil Nadu Government',
      amount: '₹50,000 per year',
      deadline: '2025-02-15',
      eligibility: ['12th grade with 85%+ marks', 'Engineering admission confirmed', 'Family income < ₹8 LPA'],
      type: 'Merit-based',
      description: 'Government scholarship for meritorious students pursuing engineering courses in Tamil Nadu.',
      applicationLink: 'https://tnscholarship.gov.in',
      requirements: ['Academic transcripts', 'Income certificate', 'Admission letter', 'Bank details']
    },
    {
      id: '2',
      name: 'Karpagam Excellence Scholarship',
      provider: 'Karpagam College of Engineering',
      amount: '₹75,000 per year',
      deadline: '2025-01-30',
      eligibility: ['JEE Main score > 85 percentile', 'Admission to Karpagam College', 'Academic excellence'],
      type: 'Merit-based',
      description: 'Institutional scholarship for top performers admitted to Karpagam College of Engineering.',
      applicationLink: 'https://www.kce.ac.in/scholarships',
      requirements: ['JEE Main scorecard', 'Academic certificates', 'Application form', 'Recommendation letter']
    },
    {
      id: '3',
      name: 'SC/ST Scholarship Scheme',
      provider: 'Central Government',
      amount: '₹1,20,000 per year',
      deadline: '2025-03-01',
      eligibility: ['SC/ST category', 'Family income < ₹2.5 LPA', 'Pursuing higher education'],
      type: 'Need-based',
      description: 'Central government scholarship for SC/ST students pursuing higher education.',
      applicationLink: 'https://scholarships.gov.in',
      requirements: ['Caste certificate', 'Income certificate', 'Academic records', 'Bank account details']
    },
    {
      id: '4',
      name: 'Women in Technology Scholarship',
      provider: 'Tech Foundation India',
      amount: '₹1,00,000 one-time',
      deadline: '2025-02-28',
      eligibility: ['Female students', 'Pursuing Computer Science/IT', 'Academic merit > 80%'],
      type: 'Merit-based',
      description: 'Encouraging women to pursue careers in technology and engineering fields.',
      applicationLink: 'https://techfoundation.org.in',
      requirements: ['Academic transcripts', 'Essay on technology', 'Project portfolio', 'Recommendation letters']
    },
    {
      id: '5',
      name: 'Rural Student Support Scholarship',
      provider: 'Education Trust of India',
      amount: '₹60,000 per year',
      deadline: '2025-01-20',
      eligibility: ['Rural background', 'First generation college student', 'Family income < ₹5 LPA'],
      type: 'Need-based',
      description: 'Supporting rural students to access quality higher education opportunities.',
      applicationLink: 'https://educationtrust.org.in',
      requirements: ['Rural residence proof', 'Income certificate', 'Academic records', 'Personal statement']
    }
  ];

  const scholarshipTypes = ['all', 'Merit-based', 'Need-based', 'Sports', 'Arts'];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || scholarship.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getPriorityBadge = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 7) {
      return <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs font-medium">Urgent</span>;
    } else if (daysLeft <= 30) {
      return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">Soon</span>;
    } else {
      return <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">Open</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-4 bg-gradient-to-br from-yellow-400/80 to-pink-500/80 dark:from-yellow-800/80 dark:to-pink-900/80 rounded-2xl shadow-lg">
            <GraduationCap className="h-8 w-8 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('scholarships')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Discover funding opportunities for your education</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-10 flex flex-col sm:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 h-6 w-6" />
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white shadow-lg transition-all text-lg"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 h-6 w-6" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-14 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white shadow-lg transition-all text-lg"
          >
            {scholarshipTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 hover:scale-[1.025] hover:shadow-2xl transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedScholarship(scholarship)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{scholarship.name}</h3>
                <p className="text-base text-gray-500 dark:text-gray-400">{scholarship.provider}</p>
              </div>
              {getPriorityBadge(scholarship.deadline)}
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">{scholarship.description}</p>
            <div className="flex flex-wrap gap-6 mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-base font-medium">
                <DollarSign className="h-5 w-5 mr-2" />{scholarship.amount}
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-base font-medium">
                <Calendar className="h-5 w-5 mr-2" />{new Date(scholarship.deadline).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-base font-medium">
                {scholarship.type}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-bold text-base transition-all">View Details →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Scholarship Detail Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/90 dark:bg-gray-900/95 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-slide-up">
            <div className="p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow">{selectedScholarship.name}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{selectedScholarship.provider}</p>
                </div>
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-green-50/80 dark:bg-green-900/40 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Amount</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedScholarship.amount}</p>
                </div>
                <div className="bg-blue-50/80 dark:bg-blue-900/40 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Deadline</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{new Date(selectedScholarship.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{selectedScholarship.description}</p>
              </div>
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3">
                  {selectedScholarship.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg text-gray-600 dark:text-gray-400">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Required Documents</h3>
                <ul className="space-y-3">
                  {selectedScholarship.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg text-gray-600 dark:text-gray-400">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href={selectedScholarship.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-br from-yellow-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-pink-600 transition-all text-center"
                >
                  Apply Now
                </a>
                <button className="flex-1 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-gradient-to-br from-yellow-100/80 to-pink-100/80 dark:from-yellow-900/40 dark:to-pink-900/40 p-8 rounded-2xl shadow-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center space-x-4">
            <GraduationCap className="h-9 w-9 text-yellow-500" />
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{scholarships.length}</div>
              <div className="text-base text-gray-500 dark:text-gray-400 font-semibold">Available Scholarships</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-100/80 to-blue-100/80 dark:from-green-900/40 dark:to-blue-900/40 p-8 rounded-2xl shadow-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-4">
            <DollarSign className="h-9 w-9 text-green-500" />
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">₹45L+</div>
              <div className="text-base text-gray-500 dark:text-gray-400 font-semibold">Total Funding Available</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 p-8 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-4">
            <Users className="h-9 w-9 text-blue-500" />
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">1,200+</div>
              <div className="text-base text-gray-500 dark:text-gray-400 font-semibold">Students Benefited</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;