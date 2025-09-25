import React, { useState } from 'react';
import { FileUp as FileUser, Download, Eye, Edit3, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User } from '../types';

interface ResumeBuilderProps {
  user: User;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ user }) => {
  const { t } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: user.fullName,
      email: user.email,
      phone: user.phoneNumber,
      location: 'Coimbatore, Tamil Nadu',
      linkedin: '',
      github: ''
    },
    summary: 'Passionate computer science student with strong problem-solving skills and experience in web development.',
    education: [
      {
        degree: 'B.Tech Computer Science',
        institution: 'Karpagam College of Engineering',
        year: '2022-2026',
        grade: '8.5 CGPA'
      }
    ],
    experience: [],
    skills: ['JavaScript', 'React', 'Python', 'Java', 'SQL'],
    projects: [
      {
        name: 'Career Guidance Platform',
        description: 'A web application to help students choose their career paths',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: ''
      }
    ],
    achievements: []
  });

  const templates = [
    { id: 'modern', name: 'Modern', preview: 'Clean and professional design' },
    { id: 'classic', name: 'Classic', preview: 'Traditional format' },
    { id: 'creative', name: 'Creative', preview: 'Colorful and unique layout' },
    { id: 'minimal', name: 'Minimal', preview: 'Simple and elegant' }
  ];

  // Only for object sections like personalInfo
  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData(prev => {
      // Only update if section is an object
      const sectionValue = prev[section as keyof typeof prev];
      if (
        sectionValue &&
        typeof sectionValue === 'object' &&
        !Array.isArray(sectionValue)
      ) {
        return {
          ...prev,
          [section]: {
            ...sectionValue as Record<string, any>,
            [field]: value
          }
        };
      }
      // Otherwise, do nothing
      return prev;
    });
  };

  const addSkill = () => {
    const skill = prompt('Enter a new skill:');
    if (skill) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
  <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-3 bg-gradient-to-br from-pink-400/80 to-pink-600/80 dark:from-pink-700/80 dark:to-pink-900/80 rounded-xl shadow-lg">
            <FileUser className="h-7 w-7 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('resume_builder')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Create professional resumes with our easy-to-use builder</p>
          </div>
        </div>
      </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume Editor */}
  <div className="lg:col-span-2 space-y-8">
          {/* Template Selection */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Template</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-6 rounded-xl border-2 font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400/60 focus:border-pink-400/60 ${
                    selectedTemplate === template.id
                      ? 'border-pink-500 bg-gradient-to-br from-pink-100/80 to-pink-300/80 dark:from-pink-900/80 dark:to-pink-800/80 scale-105'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-24 bg-gradient-to-br from-gray-100/80 to-pink-100/80 dark:from-gray-700/80 dark:to-pink-900/40 rounded-xl mb-3"></div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{template.preview}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Full Name"
                value={resumeData.personalInfo.name}
                onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
              />
              <input
                type="text"
                placeholder="Location"
                value={resumeData.personalInfo.location}
                onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h3>
            <textarea
              placeholder="Write a brief summary about yourself..."
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
              rows={4}
            />
          </div>

          {/* Skills */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
              <button
                onClick={addSkill}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-700 text-white rounded-xl font-semibold text-base shadow-lg hover:from-pink-600 hover:to-pink-800 transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add Skill</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-base font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 shadow-sm transition-all"
                  onClick={() => removeSkill(index)}
                >
                  {skill}
                  <span className="ml-3 text-blue-600 dark:text-blue-300">×</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Mini Resume Preview */}
            <div className="bg-gradient-to-br from-gray-50/80 to-pink-100/80 dark:from-gray-700/80 dark:to-pink-900/40 rounded-xl p-5 mb-6 text-sm shadow-sm">
              <div className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{resumeData.personalInfo.name}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{resumeData.personalInfo.email}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-4">{resumeData.personalInfo.phone}</div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Summary</div>
              <div className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{resumeData.summary}</div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Skills</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
                {resumeData.skills.length > 4 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded text-xs font-medium">
                    +{resumeData.skills.length - 4}
                  </span>
                )}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Education</div>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="text-gray-600 dark:text-gray-400 mb-2">
                  <div className="font-medium">{edu.degree}</div>
                  <div>{edu.institution}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-br from-pink-500 to-pink-700 text-white rounded-xl font-semibold text-base shadow-lg hover:from-pink-600 hover:to-pink-800 transition-all duration-200">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-3 px-6 py-3 border-2 border-pink-600 text-pink-600 dark:text-pink-400 rounded-xl font-semibold text-base shadow-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200">
                <Eye className="h-5 w-5" />
                <span>Full Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;