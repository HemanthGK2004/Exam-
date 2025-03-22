import React from 'react';
import { Clock, Shield, AlertTriangle, Maximize } from 'lucide-react';

interface ExamRulesProps {
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
}

export const ExamRules: React.FC<ExamRulesProps> = ({ isFullscreen, onEnterFullscreen }) => {
  return (
    <div className="space-y-6 p-6 bg-slate-800 rounded-lg text-slate-100">
      <div className="flex items-center gap-2 text-xl font-semibold text-blue-400">
        <Shield size={24} />
        <h2>Test Rules & Guidelines</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <Clock size={20} />
            <h3 className="font-medium">Time Limit</h3>
          </div>
          <p className="text-slate-300">
            You have 30 minutes to complete this test. Each question has an individual time limit
            shown in the question header. The timer will start when you click "Start Test."
          </p>
        </div>

        <div className="bg-amber-900/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-amber-400">
            <AlertTriangle size={20} />
            <h3 className="font-medium">Suspicious Activity Monitoring</h3>
          </div>
          <p className="text-slate-300 mb-2">The following activities will be detected as suspicious:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Tab switching (limited to 3 times)</li>
            <li>Copy/paste attempts</li>
            <li>Screenshot attempts</li>
            <li>Unnatural typing patterns</li>
            <li>Window resizing or minimizing (will automatically submit your test)</li>
            <li>Right-clicking</li>
          </ul>
        </div>

        <div className="bg-red-900/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-red-400">
            <AlertTriangle size={20} />
            <h3 className="font-medium">Risk Level</h3>
          </div>
          <p className="text-slate-300">
            Suspicious activities will increase your risk level. If your risk level is too high,
            your submission might be flagged or rejected.
          </p>
        </div>

        <div className="bg-slate-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <Maximize size={20} />
            <h3 className="font-medium">Window Size Requirements</h3>
          </div>
          <p className="text-slate-300 mb-4">
            The test must be taken in full-screen mode. Reducing window size after starting will
            automatically submit your test.
          </p>
          <p className="text-red-400 italic mb-4">
            "Keep your screen size unchanged – resizing will automatically submit the test!"
          </p>
          {!isFullscreen && (
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-yellow-400 mb-3">Your window is currently not in full-screen mode.</p>
              <button
                onClick={onEnterFullscreen}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Maximize size={18} />
                Enter Fullscreen Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};