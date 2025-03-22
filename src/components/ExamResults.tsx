import React from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ExamResultsProps {
  answers: Record<string, string>;
  questions: Question[];
}

export const ExamResults: React.FC<ExamResultsProps> = ({ answers, questions }) => {
  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const score = (correctAnswers / questions.length) * 100;

  return (
    <div className="bg-slate-800 p-6 rounded-lg space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Exam Results</h2>
        <p className="text-3xl font-bold text-blue-400 mb-4">{score.toFixed(1)}%</p>
        <p className="text-slate-300">
          You answered {correctAnswers} out of {questions.length} questions correctly
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="border-t border-slate-700 pt-4">
            <div className="flex items-start gap-3">
              {answers[question.id] === question.correctAnswer ? (
                <CheckCircle className="text-green-500 mt-1" size={20} />
              ) : (
                <XCircle className="text-red-500 mt-1" size={20} />
              )}
              <div>
                <p className="text-slate-200 font-medium mb-2">{question.text}</p>
                <p className="text-slate-400 mb-1">Your answer: {answers[question.id]}</p>
                <p className="text-green-400 mb-2">Correct answer: {question.correctAnswer}</p>
                <p className="text-slate-300 text-sm bg-slate-700/50 p-3 rounded">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};