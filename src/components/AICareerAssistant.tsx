import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AICareerAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Career Assistant. I can help you with career guidance, college selection, scholarship information, and more. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    'college': "Based on your profile, I recommend looking into engineering colleges in Coimbatore like Karpagam College of Engineering, PSG College of Technology, and CIT. These institutions offer excellent programs with good placement records.",
    'scholarship': "There are several scholarships available for students in Tamil Nadu. Some popular ones include Merit Scholarships, SC/ST scholarships, and private foundation scholarships. Would you like specific information about any particular scholarship?",
    'career': "Career planning involves understanding your interests, skills, and market demand. Popular career paths in technology include Software Engineering, Data Science, AI/ML, and Cybersecurity. What field interests you most?",
    'placement': "Placement opportunities depend on your college, skills, and chosen field. Top engineering colleges in Coimbatore have placement rates of 80-95% with average packages ranging from ₹4-12 LPA.",
    'courses': "Popular undergraduate courses include B.Tech (Computer Science, Mechanical, Electrical), B.Sc (Physics, Chemistry, Mathematics), BBA, and specialized programs in emerging technologies."
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('college') || message.includes('university')) {
      return predefinedResponses.college;
    } else if (message.includes('scholarship') || message.includes('financial aid')) {
      return predefinedResponses.scholarship;
    } else if (message.includes('career') || message.includes('job')) {
      return predefinedResponses.career;
    } else if (message.includes('placement') || message.includes('job opportunity')) {
      return predefinedResponses.placement;
    } else if (message.includes('course') || message.includes('program')) {
      return predefinedResponses.courses;
    } else {
      return "I understand you're looking for guidance. I can help you with college selection, career planning, scholarships, and course recommendations. Could you please be more specific about what you'd like to know?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are the best engineering colleges in Coimbatore?",
    "How can I get scholarships for my studies?",
    "What career options are available in technology?",
    "Tell me about placement opportunities"
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-4 bg-gradient-to-br from-red-400/80 to-pink-500/80 dark:from-red-800/80 dark:to-pink-900/80 rounded-2xl shadow-lg">
            <Bot className="h-8 w-8 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('ai_assistant')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Get personalized career guidance powered by AI</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-4 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500' 
                    : 'bg-gradient-to-br from-red-500 to-pink-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-6 py-4 shadow-md transition-all duration-200 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white animate-bounce-in-right'
                    : 'bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white animate-bounce-in-left'
                }`}>
                  <p className="text-base font-medium">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-4 max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white/90 dark:bg-gray-700/90 rounded-2xl px-6 py-4 shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50/80 to-pink-100/80 dark:from-gray-800/80 dark:to-pink-900/40">
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Questions:</p>
          <div className="flex flex-wrap gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-4 py-2 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-full text-base font-medium hover:bg-pink-100 dark:hover:bg-pink-900/40 shadow-sm transition-all"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80">
          <div className="flex space-x-5">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about careers, colleges, or scholarships..."
              className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white resize-none text-base shadow-sm transition-all"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-8 py-3 bg-gradient-to-br from-pink-500 to-red-600 text-white rounded-2xl font-bold text-base shadow-lg hover:from-pink-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICareerAssistant;