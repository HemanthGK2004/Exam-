import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface StudentVerificationProps {
  onVerify: (code: string) => void;
  isVerified: boolean;
}

export const StudentVerification: React.FC<StudentVerificationProps> = ({ onVerify, isVerified }) => {
  const [studentCode, setStudentCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentCode.length === 6) {
      onVerify(studentCode);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-slate-100 mb-4">Enter your 6-digit Student Code:</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="e.g. 123456"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value.slice(0, 6))}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            pattern="[0-9]{6}"
            maxLength={6}
            disabled={isVerified}
          />
        </div>
        <button
          type="submit"
          disabled={studentCode.length !== 6 || isVerified}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isVerified
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isVerified ? (
            <>
              <CheckCircle size={20} />
              Verified
            </>
          ) : (
            'Verify Code'
          )}
        </button>
      </form>
    </div>
  );
};