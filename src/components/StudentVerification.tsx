import React, { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';

interface StudentVerificationProps {
  onVerify: (name: string, code: string, photo: File | null) => void;
  isVerified: boolean;
}

export const StudentVerification: React.FC<StudentVerificationProps> = ({ onVerify, isVerified }) => {
  const [name, setName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Image Preview URL

  // Handle name input (only letters & spaces allowed)
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters & spaces
    setName(newValue);
  }, []);

  // Handle code input (only numbers, max length 6)
  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 6);
    setStudentCode(newValue);
  }, []);

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setPhoto(file); // Save file
      setPhotoPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0 && studentCode.length === 6) {
      onVerify(name.trim(), studentCode, photo);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-slate-100 mb-4">Student Verification</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isVerified}
            autoFocus
          />
        </div>

        {/* Student Code Input */}
        <div>
          <input
            type="text"
            placeholder="Enter 6-digit student code"
            value={studentCode}
            onChange={handleCodeChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            maxLength={6}
            disabled={isVerified}
          />
        </div>

        {/* Upload Photo Input */}
        <div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePhotoChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 rounded-lg"
            disabled={isVerified}
          />
        </div>

        {/* Show Image Preview */}
        {photoPreview && (
          <div className="mt-4">
            <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-slate-500" />
          </div>
        )}

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isVerified || name.trim().length === 0 || studentCode.length !== 6}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            isVerified
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isVerified ? (
            <>
              <CheckCircle size={20} />
              <span aria-live="polite">Verified</span>
            </>
          ) : (
            'Verify'
          )}
        </button>
      </form>
    </div>
  );
};
