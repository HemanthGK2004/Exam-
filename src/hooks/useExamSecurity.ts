import { useState, useEffect, useCallback } from 'react';
import { SecurityViolation, ExamState } from '../types';

const RISK_THRESHOLDS = {
  LOW: 20,
  MEDIUM: 50,
  HIGH: 80,
};

export const useExamSecurity = (examState: ExamState, onViolation: (violation: SecurityViolation) => void) => {
  const [violations, setViolations] = useState<SecurityViolation[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleTabSwitch = useCallback(() => {
    if (!examState.isTestStarted) return;
    
    const violation: SecurityViolation = {
      type: 'tab_switch',
      timestamp: Date.now(),
    };
    
    onViolation(violation);
    setViolations(prev => [...prev, violation]);
  }, [examState.isTestStarted, onViolation]);

  const handleCopyPaste = useCallback((e: ClipboardEvent) => {
    if (!examState.isTestStarted) return;
    e.preventDefault();
    
    const violation: SecurityViolation = {
      type: 'copy_paste',
      timestamp: Date.now(),
    };
    
    onViolation(violation);
    setViolations(prev => [...prev, violation]);
  }, [examState.isTestStarted, onViolation]);

  const handleRightClick = useCallback((e: MouseEvent) => {
    if (!examState.isTestStarted) return;
    e.preventDefault();
    
    const violation: SecurityViolation = {
      type: 'right_click',
      timestamp: Date.now(),
    };
    
    onViolation(violation);
    setViolations(prev => [...prev, violation]);
  }, [examState.isTestStarted, onViolation]);

  const handleResize = useCallback(() => {
    if (!examState.isTestStarted) return;
    
    const violation: SecurityViolation = {
      type: 'window_resize',
      timestamp: Date.now(),
    };
    
    onViolation(violation);
    setViolations(prev => [...prev, violation]);
  }, [examState.isTestStarted, onViolation]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error handling fullscreen:', err);
    }
  }, []);

  useEffect(() => {
    if (!examState.isTestStarted) return;

    document.addEventListener('visibilitychange', handleTabSwitch);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('contextmenu', handleRightClick);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleTabSwitch);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('contextmenu', handleRightClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [examState.isTestStarted, handleTabSwitch, handleCopyPaste, handleRightClick, handleResize]);

  const calculateRiskScore = useCallback(() => {
    const weights = {
      tab_switch: 15,
      copy_paste: 25,
      screenshot: 30,
      window_resize: 40,
      right_click: 10,
      unnatural_typing: 20,
    };

    return violations.reduce((score, violation) => {
      return score + weights[violation.type];
    }, 0);
  }, [violations]);

  return {
    violations,
    isFullscreen,
    toggleFullscreen,
    riskScore: calculateRiskScore(),
    riskLevel: calculateRiskScore() > RISK_THRESHOLDS.HIGH ? 'HIGH' :
               calculateRiskScore() > RISK_THRESHOLDS.MEDIUM ? 'MEDIUM' : 'LOW'
  };
};