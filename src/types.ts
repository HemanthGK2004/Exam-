export interface ExamState {
  isFullscreen: boolean;
  studentCode: string;
  isVerified: boolean;
  riskLevel: number;
  tabSwitchCount: number;
  isTestStarted: boolean;
  timeRemaining: number;
  testStatus: 'not_started' | 'in_progress' | 'submitted' | 'flagged' | 'terminated';
  currentQuestionIndex: number;
  answers: Record<string, string>;
  warningCount: number;
  questionTimeRemaining: number;
  typingPattern: number[];
}

export interface SecurityViolation {
  type: 'tab_switch' | 'copy_paste' | 'screenshot' | 'window_resize' | 'right_click' | 'unnatural_typing';
  timestamp: number;
  details?: string;
}

export interface Question {
  id: string;
  text: string;
  timeLimit: number;
  type: 'mcq' | 'text';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}