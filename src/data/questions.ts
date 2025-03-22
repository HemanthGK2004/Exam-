export const questions = [
  // Question 1 - Easy (MCQ)
  {
    id: '1',
    text: 'What is the primary purpose of React hooks?',
    timeLimit: 30,
    type: 'mcq',
    difficulty: 'easy',
    category: 'React Basics',
    options: [
      'To add state to functional components',
      'To create class components',
      'To style React components',
      'To handle routing in React'
    ],
    correctAnswer: 'To add state to functional components',
    explanation: 'React hooks allow functional components to use state and other React features without writing a class component.',
    points: 5,
    negativePoints: -2
  },

  // Question 2 - Medium (Text)
  {
    id: '2',
    text: 'Explain the concept of React Virtual DOM in your own words.',
    timeLimit: 30,
    type: 'text',
    difficulty: 'medium',
    category: 'React Performance',
    correctAnswer: [
      'The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance.',
      'A memory-based representation of the UI that React reconciles with the real DOM.'
    ], // Accepts multiple valid answers
    explanation: 'A good explanation should mention that it is a representation of the UI kept in memory and synced with the real DOM through reconciliation.',
    points: 10,
    negativePoints: -5
  },

  // Question 3 - Easy (MCQ)
  {
    id: '3',
    text: 'Which hook is used for side effects in React?',
    timeLimit: 30,
    type: 'mcq',
    difficulty: 'easy',
    category: 'React Hooks',
    options: [
      'useEffect',
      'useState',
      'useContext',
      'useReducer'
    ],
    correctAnswer: 'useEffect',
    explanation: 'useEffect is used for handling side effects like data fetching, subscriptions, or DOM manipulation.',
    points: 5,
    negativePoints: -2
  },

  // Question 4 - Medium (MCQ)
  {
    id: '4',
    text: 'What is the difference between props and state in React?',
    timeLimit: 40,
    type: 'mcq',
    difficulty: 'medium',
    category: 'React Basics',
    options: [
      'Props are mutable, state is immutable',
      'Props are used for passing data, state is used for managing component data',
      'Both are the same in React',
      'State is used for passing data, props manage component data'
    ],
    correctAnswer: 'Props are used for passing data, state is used for managing component data',
    explanation: 'Props are immutable and passed from parent to child, whereas state is mutable and used to manage local component data.',
    points: 10,
    negativePoints: -3
  },

  // Question 5 - Medium (MCQ)
  {
    id: '5',
    text: 'Which React hook is used for performance optimization by memoizing a function?',
    timeLimit: 40,
    type: 'mcq',
    difficulty: 'medium',
    category: 'React Optimization',
    options: [
      'useMemo',
      'useCallback',
      'useEffect',
      'useReducer'
    ],
    correctAnswer: 'useCallback',
    explanation: 'useCallback is used to memoize a function so that it does not get re-created on every render unless its dependencies change.',
    points: 10,
    negativePoints: -3
  },

  // Question 6 - Medium (Text)
  {
    id: '6',
    text: 'Explain how the useReducer hook works in React.',
    timeLimit: 60,
    type: 'text',
    difficulty: 'medium',
    category: 'React State Management',
    correctAnswer: [
      'The useReducer hook is used for managing complex state logic in React.',
      'It takes a reducer function and an initial state, returning the current state and a dispatch function.'
    ], // Accepts multiple valid answers
    explanation: 'useReducer is similar to useState but is better suited for managing complex state logic with multiple transitions.',
    points: 15,
    negativePoints: -5
  },

  // Question 7 - Hard (MCQ)
  {
    id: '7',
    text: 'What is reconciliation in React?',
    timeLimit: 50,
    type: 'mcq',
    difficulty: 'hard',
    category: 'React Internals',
    options: [
      'A process of resolving conflicts between React components',
      'React’s process of updating the Virtual DOM and syncing with the real DOM',
      'A debugging mechanism in React',
      'A technique for sharing state between components'
    ],
    correctAnswer: 'React’s process of updating the Virtual DOM and syncing with the real DOM',
    explanation: 'Reconciliation is the process where React updates the Virtual DOM, compares it with the previous version, and efficiently updates only the changed parts in the real DOM.',
    points: 15,
    negativePoints: -5
  },

  // Question 8 - Hard (MCQ)
  {
    id: '8',
    text: 'Which React lifecycle method is used to clean up side effects?',
    timeLimit: 50,
    type: 'mcq',
    difficulty: 'hard',
    category: 'React Lifecycle',
    options: [
      'componentWillUnmount',
      'useEffect',
      'useState',
      'shouldComponentUpdate'
    ],
    correctAnswer: 'componentWillUnmount',
    explanation: 'componentWillUnmount is invoked just before a component is removed from the DOM and is used to clean up subscriptions, timers, or other resources.',
    points: 15,
    negativePoints: -5
  },

  // Question 9 - Hard (Text)
  {
    id: '9',
    text: 'What are the benefits of using React Suspense and React Lazy?',
    timeLimit: 70,
    type: 'text',
    difficulty: 'hard',
    category: 'React Performance',
    correctAnswer: [
      'React Suspense and Lazy help in code-splitting and lazy loading components, improving performance by reducing initial bundle size.',
      'They allow dynamically loading components only when they are needed, which enhances user experience by reducing initial load time.'
    ], // Accepts multiple valid answers
    explanation: 'React Suspense and Lazy enable lazy loading components, improving performance by splitting code and loading components only when required.',
    points: 20,
    negativePoints: -8
  },

  // Question 10 - Hard (MCQ)
  {
    id: '10',
    text: 'Which of the following can be considered a pure function in React?',
    timeLimit: 70,
    type: 'mcq',
    difficulty: 'hard',
    category: 'Functional Components',
    options: [
      'A function that modifies the state directly',
      'A function that returns a new state without modifying the existing one',
      'A function that calls an API and updates the component',
      'A function that renders JSX and has side effects'
    ],
    correctAnswer: 'A function that returns a new state without modifying the existing one',
    explanation: 'A pure function is a function that, given the same input, will always return the same output without modifying any external state.',
    points: 20,
    negativePoints: -8
  }
];
