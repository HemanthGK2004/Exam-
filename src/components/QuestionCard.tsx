import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  timeRemaining: number;
  onTimeUp: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  timeRemaining,
  onTimeUp
}) => {
  const [questionTimer, setQuestionTimer] = useState(question.timeLimit);
  const [textAnswer, setTextAnswer] = useState('');
  const [lastKeypressTime, setLastKeypressTime] = useState<number>(0);
  const [typingPattern, setTypingPattern] = useState<number[]>([]);

  useEffect(() => {
    if (questionTimer > 0) {
      const timer = setInterval(() => {
        setQuestionTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questionTimer, onTimeUp]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentTime = Date.now();
    if (lastKeypressTime > 0) {
      const timeDiff = currentTime - lastKeypressTime;
      const newPattern = [...typingPattern, timeDiff];
      
      // Check for suspicious typing patterns
      if (newPattern.length > 5) {
        const avgTime = newPattern.reduce((a, b) => a + b, 0) / newPattern.length;
        const allSimilar = newPattern.every(time => Math.abs(time - avgTime) < 50);
        
        if (allSimilar) {
          toast('Warning: Suspicious typing pattern detected', {
            icon: '⚠️',
            duration: 4000
          });
        }
      }
      
      setTypingPattern(newPattern);
    }
    
    setLastKeypressTime(currentTime);
    setTextAnswer(e.target.value);
    onAnswerSelect(e.target.value);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-100">Question {question.id}</h3>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={18} />
          <span className={questionTimer <= 10 ? 'text-red-400' : ''}>
            {Math.floor(questionTimer / 60)}:{(questionTimer % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <p className="text-slate-200 text-lg">{question.text}</p>

      {question.type === 'mcq' ? (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedAnswer === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
              disabled={questionTimer === 0}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={textAnswer}
            onChange={handleTyping}
            disabled={questionTimer === 0}
            placeholder="Type your answer here..."
            className="w-full h-32 p-3 bg-slate-700 text-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {questionTimer === 0 && (
            <p className="text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} />
              Time's up! You can no longer modify your answer.
            </p>
          )}
        </div>
      )}
    </div>
  );
};