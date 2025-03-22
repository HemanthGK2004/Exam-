import React, { useState, useCallback, useEffect } from 'react';
import { ExamRules } from './components/ExamRules';
import { StudentVerification } from './components/StudentVerification';
import { QuestionCard } from './components/QuestionCard';
import { ExamResults } from './components/ExamResults';
import { useExamSecurity } from './hooks/useExamSecurity';
import { ExamState, SecurityViolation } from './types';
import { Shield } from 'lucide-react';
import { questions } from './data/questions';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [examState, setExamState] = useState<ExamState>({
    isFullscreen: false,
    studentCode: '',
    isVerified: false,
    riskLevel: 0,
    tabSwitchCount: 0,
    isTestStarted: false,
    timeRemaining: 1800,
    testStatus: 'not_started',
    currentQuestionIndex: 0,
    answers: {},
    warningCount: 0,
    questionTimeRemaining: 30,
    typingPattern: []
  });

  const handleViolation = useCallback((violation: SecurityViolation) => {
    setExamState(prev => {
      const newWarningCount = prev.warningCount + 1;
      
      if (newWarningCount === 1) {
        toast('First warning: Suspicious activity detected', {
          icon: '⚠️',
          duration: 4000
        });
      } else if (newWarningCount === 2) {
        toast.error('Final warning: Further violations will terminate the test');
      } else if (newWarningCount >= 3) {
        toast.error('Test terminated due to multiple violations');
        return {
          ...prev,
          testStatus: 'terminated',
          warningCount: newWarningCount
        };
      }

      return {
        ...prev,
        riskLevel: prev.riskLevel + 1,
        tabSwitchCount: violation.type === 'tab_switch' ? prev.tabSwitchCount + 1 : prev.tabSwitchCount,
        warningCount: newWarningCount
      };
    });
  }, []);

  const { isFullscreen, toggleFullscreen, riskLevel } = useExamSecurity(examState, handleViolation);

  const handleVerification = (code: string) => {
    if (code.length < 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }
    setExamState(prev => ({
      ...prev,
      studentCode: code,
      isVerified: true
    }));
    toast.success('Student code verified');
  };

  const handleAnswerSelect = (answer: string) => {
    setExamState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questions[prev.currentQuestionIndex].id]: answer
      }
    }));
  };

  const handleQuestionTimeUp = () => {
    toast.error('Time\'s up for this question!');
    if (examState.currentQuestionIndex < questions.length - 1) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setExamState(prev => ({
        ...prev,
        testStatus: 'submitted'
      }));
    }
  };

  const handleNextQuestion = () => {
    if (examState.currentQuestionIndex < questions.length - 1) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setExamState(prev => ({
        ...prev,
        testStatus: 'submitted'
      }));
    }
  };

  const handleStartOver = () => {
    setExamState({
      isFullscreen: false,
      studentCode: '',
      isVerified: false,
      riskLevel: 0,
      tabSwitchCount: 0,
      isTestStarted: false,
      timeRemaining: 1800,
      testStatus: 'not_started',
      currentQuestionIndex: 0,
      answers: {},
      warningCount: 0,
      questionTimeRemaining: 30,
      typingPattern: []
    });
  };

  useEffect(() => {
    let timer: number;
    if (examState.isTestStarted && examState.testStatus === 'in_progress') {
      timer = window.setInterval(() => {
        setExamState(prev => {
          if (prev.timeRemaining <= 0) {
            clearInterval(timer);
            return { ...prev, testStatus: 'submitted' };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examState.isTestStarted, examState.testStatus]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield size={32} className="text-blue-500" />
              <h1 className="text-3xl font-bold">Risk-Based Proctoring</h1>
            </div>
            {examState.isVerified && (
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
                <span className="text-sm text-slate-400">Risk Level:</span>
                <span className={`font-medium ${
                  riskLevel === 'LOW' ? 'text-green-400' :
                  riskLevel === 'MEDIUM' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {riskLevel}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {examState.testStatus === 'terminated' ? (
              <div className="bg-red-900/50 p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Test Terminated</h2>
                <p className="text-slate-300 mb-6">
                  Your test has been terminated due to multiple security violations.
                </p>
                <button
                  onClick={handleStartOver}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Start Over
                </button>
              </div>
            ) : examState.testStatus === 'submitted' ? (
              <>
                <ExamResults answers={examState.answers} questions={questions} />
                <button
                  onClick={handleStartOver}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Take Another Test
                </button>
              </>
            ) : examState.isTestStarted ? (
              <>
                <QuestionCard
                  question={questions[examState.currentQuestionIndex]}
                  selectedAnswer={examState.answers[questions[examState.currentQuestionIndex].id]}
                  onAnswerSelect={handleAnswerSelect}
                  timeRemaining={examState.timeRemaining}
                  onTimeUp={handleQuestionTimeUp}
                />
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {examState.currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Test'}
                </button>
              </>
            ) : (
              <>
                <StudentVerification
                  onVerify={handleVerification}
                  isVerified={examState.isVerified}
                />
                
                <ExamRules
                  isFullscreen={isFullscreen}
                  onEnterFullscreen={toggleFullscreen}
                />

                {examState.isVerified && isFullscreen && (
                  <button
                    onClick={() => setExamState(prev => ({
                      ...prev,
                      isTestStarted: true,
                      testStatus: 'in_progress'
                    }))}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Start Test
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;