import React, { useState } from 'react';
import { Search, MapPin, Phone, Globe, Star, Users, BookOpen, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  students: string;
  courses: string;
  fees: string;
  website: string;
  phone: string;
  email: string;
  description: string;
  image: string;
  established: string;
  accreditation: string[];
}

const CollegeExplorer: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const colleges: College[] = [
    {
      id: '1',
      name: 'Karpagam College of Engineering',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Private Engineering College',
      rating: 4.2,
      students: '3000+',
      courses: '15+',
      fees: '₹1.2L - ₹2.5L per year',
      website: 'https://www.kce.ac.in',
      phone: '+91-422-2611146',
      email: 'info@kce.ac.in',
      description: 'Karpagam College of Engineering is a premier engineering institution in Coimbatore, known for its excellent academic programs and industry connections.',
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
      established: '1999',
      accreditation: ['AICTE', 'NBA', 'NAAC A+']
    },
    {
      id: '2',
      name: 'PSG College of Technology',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Private Engineering College',
      rating: 4.5,
      students: '4500+',
      courses: '20+',
      fees: '₹2.5L - ₹4L per year',
      website: 'https://www.psgtech.edu',
      phone: '+91-422-2572177',
      email: 'principal@psgtech.ac.in',
      description: 'PSG College of Technology is one of the most prestigious engineering colleges in South India with excellent placement records.',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
      established: '1951',
      accreditation: ['AICTE', 'NBA', 'NAAC A++']
    },
    {
      id: '3',
      name: 'Coimbatore Institute of Technology',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Private Engineering College',
      rating: 4.3,
      students: '3500+',
      courses: '18+',
      fees: '₹1.8L - ₹3.2L per year',
      website: 'https://www.cit.edu.in',
      phone: '+91-422-2697792',
      email: 'info@cit.edu.in',
      description: 'CIT is known for its strong engineering programs and excellent faculty with modern infrastructure and research facilities.',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800',
      established: '1956',
      accreditation: ['AICTE', 'NBA', 'NAAC A']
    },
    {
      id: '4',
      name: 'Kumaraguru College of Technology',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Private Engineering College',
      rating: 4.4,
      students: '4000+',
      courses: '22+',
      fees: '₹2.2L - ₹3.8L per year',
      website: 'https://www.kct.ac.in',
      phone: '+91-422-2669000',
      email: 'info@kct.ac.in',
      description: 'KCT is renowned for its innovative teaching methods and strong industry partnerships providing excellent career opportunities.',
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
      established: '1984',
      accreditation: ['AICTE', 'NBA', 'NAAC A+']
    },
    {
      id: '5',
      name: 'Sri Krishna College of Engineering and Technology',
      location: 'Coimbatore, Tamil Nadu',
      type: 'Private Engineering College',
      rating: 4.1,
      students: '2800+',
      courses: '16+',
      fees: '₹1.5L - ₹2.8L per year',
      website: 'https://www.skcet.ac.in',
      phone: '+91-422-2604567',
      email: 'info@skcet.ac.in',
      description: 'SKCET focuses on holistic development with strong emphasis on practical learning and skill development.',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
      established: '1985',
      accreditation: ['AICTE', 'NBA', 'NAAC A']
    }
  ];

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-4 bg-gradient-to-br from-indigo-400/80 to-pink-500/80 dark:from-indigo-800/80 dark:to-pink-900/80 rounded-2xl shadow-lg">
            <Search className="h-8 w-8 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('college_explorer')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Find and compare colleges in Coimbatore</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 h-6 w-6" />
          <input
            type="text"
            placeholder="Search colleges by name, location, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white shadow-lg transition-all text-lg"
          />
        </div>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:scale-[1.025] hover:shadow-2xl transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedCollege(college)}
          >
            <div className="relative">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400/90 to-pink-500/90 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                <Star className="h-4 w-4" />
                {college.rating}
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {college.name}
              </h3>
              <div className="flex items-center space-x-2 text-indigo-500 dark:text-indigo-300 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="text-base font-medium">{college.location}</span>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {college.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  <Users className="h-4 w-4 mr-1" />{college.students}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  <BookOpen className="h-4 w-4 mr-1" />{college.courses}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                  <Award className="h-4 w-4 mr-1" />{college.established}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">{college.fees}</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full font-medium">{college.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* College Detail Modal */}
      {selectedCollege && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/90 dark:bg-gray-900/95 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-slide-up">
            <div className="relative">
              <img
                src={selectedCollege.image}
                alt={selectedCollege.name}
                className="w-full h-72 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedCollege(null)}
                className="absolute top-5 right-5 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="h-7 w-7 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow">{selectedCollege.name}</h2>
                  <div className="flex items-center space-x-2 text-indigo-500 dark:text-indigo-300">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg font-medium">{selectedCollege.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-br from-yellow-400/90 to-pink-500/90 text-white px-5 py-2 rounded-full text-lg font-bold shadow-lg">
                  <Star className="h-5 w-5" />
                  {selectedCollege.rating}
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{selectedCollege.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-8">
                <div className="text-center p-5 bg-blue-50/80 dark:bg-blue-900/40 rounded-2xl shadow-sm">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">{selectedCollege.students}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Students</div>
                </div>
                <div className="text-center p-5 bg-green-50/80 dark:bg-green-900/40 rounded-2xl shadow-sm">
                  <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">{selectedCollege.courses}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Courses</div>
                </div>
                <div className="text-center p-5 bg-purple-50/80 dark:bg-purple-900/40 rounded-2xl shadow-sm">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">{selectedCollege.established}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Established</div>
                </div>
                <div className="text-center p-5 bg-yellow-50/80 dark:bg-yellow-900/40 rounded-2xl shadow-sm">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">{selectedCollege.rating}/5</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rating</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <a href={`tel:${selectedCollege.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline text-base">
                        {selectedCollege.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-base">
                        Visit Website
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href={`mailto:${selectedCollege.email}`} className="text-blue-600 dark:text-blue-400 hover:underline text-base">
                        {selectedCollege.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Accreditation</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCollege.accreditation.map((acc, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-base font-medium shadow-sm"
                      >
                        {acc}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Annual Fees</h4>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCollege.fees}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                  Apply Now
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeExplorer;