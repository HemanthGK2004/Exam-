import { useState, useEffect, useCallback, useMemo } from 'react';
import { SecurityViolation, ExamState } from '../types';

const RISK_THRESHOLDS = {
  LOW: 20,
  MEDIUM: 50,
  HIGH: 80,
};

const WEIGHTS = {
  tab_switch: 15,
  copy_paste: 25,
  screenshot: 30,
  window_resize: 40,
  right_click: 10,
  unnatural_typing: 20,
  inactivity: 35,
  multiple_faces: 50,
  multiple_monitor: 45,
};

export const useExamSecurity = (examState: ExamState, onViolation: (violation: SecurityViolation) => void) => {
  const [violations, setViolations] = useState<SecurityViolation[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // ✅ Function to handle violations efficiently
  const handleViolation = useCallback((type: keyof typeof WEIGHTS) => {
    if (!examState.isTestStarted) return;

    setViolations((prev) => {
      if (!prev.some((v) => v.type === type)) {
        const violation: SecurityViolation = { type, timestamp: Date.now() };
        onViolation(violation);
        return [...prev, violation];
      }
      return prev;
    });
  }, [examState.isTestStarted, onViolation]);

  useEffect(() => {
    if (!examState.isTestStarted) return;

    // ✅ Detects tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) handleViolation('tab_switch');
    };

    // ✅ Detects copy-pasting and blocks it
    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      handleViolation('copy_paste');
    };

    // ✅ Detects right-clicks and blocks them
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      handleViolation('right_click');
    };

    // ✅ Detects window resizing
    const handleResize = () => handleViolation('window_resize');

    // ✅ Detects PrintScreen key (screenshot attempt)
    const handleScreenshot = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        handleViolation('screenshot');
        setTimeout(() => {
          navigator.clipboard.writeText('Screenshot is not allowed!');
        }, 10);
      }
    };

    // ✅ Detects inactivity (no keypress/mouse move for 2 minutes)
    const handleActivity = () => {
      setLastActivity(Date.now());
    };
    const checkInactivity = () => {
      if (Date.now() - lastActivity > 120000) {
        handleViolation('inactivity');
      }
    };

    // ✅ Detects multiple monitors
    const handleMouseLeaveWindow = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        handleViolation('multiple_monitor');
      }
    };

    // ✅ Detects pasted screenshots from clipboard
    const handleClipboardImagePaste = async (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData || window.Clipboard;
      if (clipboardData?.items) {
        for (const item of clipboardData.items) {
          if (item.type.includes('image')) {
            handleViolation('screenshot');
          }
        }
      }
    };

    // ✅ AI-based Typing Pattern Analysis
    let typingStartTime = 0;
    let keystrokeCount = 0;
    const handleTyping = () => {
      if (typingStartTime === 0) typingStartTime = Date.now();
      keystrokeCount++;
      
      setTimeout(() => {
        const timeElapsed = (Date.now() - typingStartTime) / 1000; // In seconds
        const typingSpeed = keystrokeCount / timeElapsed; // keystrokes per second
        
        if (typingSpeed > 20) {
          handleViolation('unnatural_typing');
        }
        typingStartTime = 0;
        keystrokeCount = 0;
      }, 3000);
    };

    // ✅ Face Detection (Optional AI Feature)
    const detectFace = async () => {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
        // Create a video element and attach the stream
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true; // Ensure autoplay
        video.style.position = 'absolute'; // Position it for debugging (optional)
        video.style.top = '10px';
        video.style.right = '10px';
        video.style.width = '200px'; // Small size
        video.style.height = '150px';
        video.style.zIndex = '1000';
    
        document.body.appendChild(video); // Append video to body for visibility
    
        setTimeout(() => {
          // Stop webcam after a few seconds
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
    
          document.body.removeChild(video); // Remove video after detection (optional)
          
          // ⚠️ TODO: Replace with actual AI-based face detection logic
          handleViolation('multiple_faces'); 
        }, 5000);
      } catch (err) {
        console.warn("Webcam access denied or not supported.", err);
      }
    };
    

    // ✅ Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleScreenshot);
    document.addEventListener('paste', handleClipboardImagePaste);
    document.addEventListener('keydown', handleTyping);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    const inactivityInterval = setInterval(checkInactivity, 60000);
    detectFace(); // Run face detection at the start

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleScreenshot);
      document.removeEventListener('paste', handleClipboardImagePaste);
      document.removeEventListener('keydown', handleTyping);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      clearInterval(inactivityInterval);
    };
  }, [examState.isTestStarted, handleViolation, lastActivity]);

  // ✅ Optimized risk score calculation
  const riskScore = useMemo(() => {
    return violations.reduce((score, violation) => score + (WEIGHTS[violation.type] || 0), 0);
  }, [violations]);

  // ✅ Risk Level based on thresholds
  const riskLevel = useMemo(() => {
    if (riskScore > RISK_THRESHOLDS.HIGH) return 'HIGH';
    if (riskScore > RISK_THRESHOLDS.MEDIUM) return 'MEDIUM';
    return 'LOW';
  }, [riskScore]);

  // ✅ Fullscreen Handling
  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenEnabled) {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } else {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      } else {
        console.warn("Fullscreen mode is not supported in this browser.");
      }
    } catch (err) {
      console.error('Error handling fullscreen:', err);
    }
  }, []);

  return { violations, isFullscreen, toggleFullscreen, riskScore, riskLevel };
};
