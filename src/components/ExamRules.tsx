import React from "react";
import { Clock, Shield, AlertTriangle, Maximize } from "lucide-react";

interface ExamRulesProps {
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
}

const RuleCard: React.FC<{ icon: React.ReactNode; title: string; className?: string }> = ({
  icon,
  title,
  className = "bg-slate-700",
  children,
}) => (
  <div className={`${className} p-4 rounded-lg`}>
    <div className="flex items-center gap-2 mb-2 text-blue-400">{icon} <h3 className="font-medium">{title}</h3></div>
    <div className="text-slate-300">{children}</div>
  </div>
);

export const ExamRules: React.FC<ExamRulesProps> = React.memo(({ isFullscreen, onEnterFullscreen }) => {
  return (
    <div className="space-y-6 p-6 bg-slate-800 rounded-lg text-slate-100">
      <div className="flex items-center gap-2 text-xl font-semibold text-blue-400">
        <Shield size={24} />
        <h2>Test Rules & Guidelines</h2>
      </div>

      {/* Time Limit */}
      <RuleCard icon={<Clock size={20} />} title="Time Limit">
        <p>You have <strong>30 minutes</strong> to complete this test. Each question has an individual timer displayed in the header. The test begins when you click <strong>"Start Test"</strong>.</p>
      </RuleCard>

      {/* Suspicious Activity */}
      <RuleCard icon={<AlertTriangle size={20} />} title="Suspicious Activity Monitoring" className="bg-amber-900/50">
        <p className="mb-2">The following activities are considered suspicious:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Tab switching (max 3 times)</li>
          <li>Copy/paste attempts</li>
          <li>Screenshot attempts</li>
          <li>Unnatural typing patterns</li>
          <li>Window resizing/minimizing (auto-submit test)</li>
          <li>Right-clicking</li>
        </ul>
      </RuleCard>

      {/* Risk Level */}
      <RuleCard icon={<AlertTriangle size={20} />} title="Risk Level" className="bg-red-900/50">
        <p>Repeated suspicious activities will increase your <strong>risk level</strong>. If the risk level is too high, your test may be flagged or rejected.</p>
      </RuleCard>

      {/* Window Size & Fullscreen */}
      <RuleCard icon={<Maximize size={20} />} title="Window Size Requirements">
        <p className="mb-4">The test must be taken in <strong>full-screen mode</strong>. Reducing window size after starting will <span className="text-red-400 font-semibold">automatically submit your test.</span></p>
        {!isFullscreen && (
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-yellow-400 mb-3">Your window is <strong>not</strong> in full-screen mode.</p>
            <button
              onClick={onEnterFullscreen}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Maximize size={18} />
              Enter Fullscreen Mode
            </button>
          </div>
        )}
      </RuleCard>
    </div>
  );
});
