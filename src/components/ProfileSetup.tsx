import React, { useState } from 'react';
import { User as UserIcon, Save, Check } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileSetupProps {
  user: User;
  setUser: (user: User) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, setUser }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateOfBirth: '',
    gender: '',
    address: '',
    interests: [] as string[],
    academicLevel: '',
    preferredField: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaveSuccess(false);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update user data
    setUser({
      ...user,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    });
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const interestOptions = [
    'Technology', 'Medicine', 'Engineering', 'Business', 'Arts', 'Science',
    'Sports', 'Music', 'Literature', 'Mathematics', 'Physics', 'Chemistry'
  ];

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests;
    if (currentInterests.includes(interest)) {
      handleInputChange('interests', currentInterests.filter(i => i !== interest));
    } else {
      handleInputChange('interests', [...currentInterests, interest]);
    }
  };

  return (
  <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-3 bg-gradient-to-br from-green-400/80 to-green-600/80 dark:from-green-700/80 dark:to-green-900/80 rounded-xl shadow-lg">
            <UserIcon className="h-7 w-7 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('profile_setup')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Complete your profile to get personalized recommendations</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('full_name')}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('email_address')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('phone_number')}
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Academic Level
                </label>
                <select
                  value={formData.academicLevel}
                  onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                >
                  <option value="">Select Level</option>
                  <option value="10th">10th Grade</option>
                  <option value="12th">12th Grade</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Field
                </label>
                <select
                  value={formData.preferredField}
                  onChange={(e) => handleInputChange('preferredField', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                >
                  <option value="">Select Field</option>
                  <option value="engineering">Engineering</option>
                  <option value="medicine">Medicine</option>
                  <option value="business">Business</option>
                  <option value="arts">Arts</option>
                  <option value="science">Science</option>
                  <option value="law">Law</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Interests</h3>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-4">Select your areas of interest to get better recommendations</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-5 py-2.5 rounded-xl border font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400/60 ${
                    formData.interests.includes(interest)
                      ? 'bg-gradient-to-br from-green-200/80 to-green-400/80 dark:from-green-800/80 dark:to-green-900/80 border-green-500 text-green-900 dark:text-green-200 scale-105'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {saveSuccess && (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 animate-fade-in">
                  <Check className="h-5 w-5" />
                  <span className="text-base font-medium">Profile saved successfully!</span>
                </div>
              )}
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Save className="h-5 w-5" />
              <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;