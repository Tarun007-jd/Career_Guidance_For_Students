import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'gu' | 'bn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

type TranslationDict = { [key: string]: string };
type Translations = Record<Language, TranslationDict>;

const translations: Translations = {
  en: {
    'career_corrector': 'Career Corrector',
    'dashboard': 'Dashboard',
    'profile_setup': 'Profile Setup',
    'career_quiz': 'Career Quiz',
    'college_explorer': 'College Explorer',
    'ai_assistant': 'AI Career Assistant',
    'timeline_events': 'Timeline & Events',
    'scholarships': 'Scholarships',
    'resume_builder': 'Resume Builder',
    'settings': 'Settings',
    'help_support': 'Help & Support',
    'welcome_back': 'Welcome back',
    'career_journey': "Here's your career journey overview",
    'search_placeholder': 'Search colleges, courses, scholarships...',
    'student': 'Student',
    'save_changes': 'Save Changes',
    'account_settings': 'Account Settings',
    'full_name': 'Full Name',
    'email_address': 'Email Address',
    'phone_number': 'Phone Number',
  },
  hi: {
    'career_corrector': 'करियर सुधारक',
    'dashboard': 'डैशबोर्ड',
    'profile_setup': 'प्रोफ़ाइल सेटअप',
    'career_quiz': 'करियर क्विज़',
    'college_explorer': 'कॉलेज एक्सप्लोरर',
    'ai_assistant': 'AI करियर सहायक',
    'timeline_events': 'समयरेखा और घटनाएं',
    'scholarships': 'छात्रवृत्ति',
    'resume_builder': 'रिज्यूमे बिल्डर',
    'settings': 'सेटिंग्स',
    'help_support': 'सहायता और समर्थन',
    'welcome_back': 'वापस स्वागत है',
    'career_journey': 'यहाँ आपकी करियर यात्रा का अवलोकन है',
    'search_placeholder': 'कॉलेज, कोर्स, छात्रवृत्ति खोजें...',
    'student': 'छात्र',
    'save_changes': 'परिवर्तन सहेजें',
    'account_settings': 'खाता सेटिंग्स',
    'full_name': 'पूरा नाम',
    'email_address': 'ईमेल पता',
    'phone_number': 'फोन नंबर',
  },
  ta: {
    'career_corrector': 'தொழில் திருத்தி',
    'dashboard': 'டாஷ்போர்டு',
    'profile_setup': 'சுயவிவர அமைப்பு',
    'career_quiz': 'தொழில் வினாடி வினா',
    'college_explorer': 'கல்லூரி ஆராய்ச்சி',
    'ai_assistant': 'AI தொழில் உதவியாளர்',
    'timeline_events': 'காலவரிசை மற்றும் நிகழ்வுகள்',
    'scholarships': 'உதவித்தொகை',
    'resume_builder': 'விண்ணப்ப கட்டுமானம்',
    'settings': 'அமைப்புகள்',
    'help_support': 'உதவி மற்றும் ஆதரவு',
    'welcome_back': 'மீண்டும் வரவேற்கிறோம்',
    'career_journey': 'இங்கே உங்கள் தொழில் பயணத்தின் கண்ணோட்டம்',
    'search_placeholder': 'கல்லூரிகள், படிப்புகள், உதவித்தொகை தேடுங்கள்...',
    'student': 'மாணவர்',
    'save_changes': 'மாற்றங்களை சேமிக்கவும்',
    'account_settings': 'கணக்கு அமைப்புகள்',
    'full_name': 'முழு பெயர்',
    'email_address': 'மின்னஞ்சல் முகவரி',
    'phone_number': 'தொலைபேசி எண்',
  },
  te: {},
  kn: {},
  ml: {},
  gu: {},
  bn: {},
  mr: {},
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};