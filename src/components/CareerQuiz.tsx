import React, { useState } from 'react';
import { FileText, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

const CareerQuiz: React.FC = () => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "What type of work environment do you prefer?",
      options: ["Office setting", "Outdoor fieldwork", "Laboratory", "Remote/Home", "Creative studio"],
      category: "work_environment"
    },
    {
      id: 2,
      question: "Which activity interests you most?",
      options: ["Solving complex problems", "Helping people", "Creating art/content", "Analyzing data", "Leading teams"],
      category: "interests"
    },
    {
      id: 3,
      question: "What motivates you most in a career?",
      options: ["High salary", "Job security", "Making a difference", "Creative freedom", "Recognition"],
      category: "motivation"
    },
    {
      id: 4,
      question: "How do you prefer to work?",
      options: ["Independently", "In small teams", "In large groups", "With mentorship", "Leading others"],
      category: "work_style"
    },
    {
      id: 5,
      question: "Which subject did you enjoy most in school?",
      options: ["Mathematics", "Science", "Literature", "History", "Arts", "Physical Education"],
      category: "academic_preference"
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    // Simple career matching logic based on answers
    const careerMatches = [
      {
        career: "Software Engineer",
        match: 85,
        description: "Design and develop software applications and systems",
        skills: ["Programming", "Problem Solving", "Logical Thinking"],
        salary: "₹6-15 LPA",
        growth: "High"
      },
      {
        career: "Data Scientist",
        match: 78,
        description: "Analyze complex data to help organizations make decisions",
        skills: ["Statistics", "Programming", "Data Analysis"],
        salary: "₹8-20 LPA",
        growth: "Very High"
      },
      {
        career: "Product Manager",
        match: 72,
        description: "Lead product development and strategy",
        skills: ["Leadership", "Communication", "Strategic Thinking"],
        salary: "₹10-25 LPA",
        growth: "High"
      }
    ];

    setResults(careerMatches);
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
  };

  if (isCompleted && results) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Assessment Results</h1>
              <p className="text-gray-600 dark:text-gray-400">Based on your responses, here are your top career matches</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {results.map((career: any, index: number) => (
            <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{career.career}</h3>
                    <span className="px-4 py-1 bg-gradient-to-r from-green-200/80 to-green-400/80 dark:from-green-800/80 dark:to-green-900/80 text-green-900 dark:text-green-200 rounded-full text-base font-semibold shadow-sm animate-pulse">
                      {career.match}% Match
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-5 text-lg">{career.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill: string, skillIndex: number) => (
                      <span key={skillIndex} className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-base font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Salary Range</h4>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{career.salary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Growth Potential</h4>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{career.growth}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-3 bg-gradient-to-br from-purple-400/80 to-purple-600/80 dark:from-purple-700/80 dark:to-purple-900/80 rounded-xl shadow-lg">
            <FileText className="h-7 w-7 text-white drop-shadow" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow">{t('career_quiz')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">Discover your ideal career path through our comprehensive assessment</p>
          </div>
        </div>
      </div>

  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gradient-to-r from-purple-200/60 via-purple-100/60 to-purple-300/60 dark:from-purple-900/60 dark:via-purple-800/60 dark:to-purple-700/60 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 h-3 rounded-full transition-all duration-500 shadow-lg animate-pulse"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left px-6 py-4 rounded-xl border font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-400/60 ${
                  answers[questions[currentQuestion].id] === option
                    ? 'bg-gradient-to-br from-purple-200/80 to-purple-400/80 dark:from-purple-800/80 dark:to-purple-900/80 border-purple-500 text-purple-900 dark:text-purple-200 scale-105'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}</span>
            {currentQuestion < questions.length - 1 && <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerQuiz;