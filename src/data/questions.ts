export const questions = [
  {
    id: '1',
    text: 'What is the primary purpose of React hooks?',
    timeLimit: 30,
    type: 'mcq',
    options: [
      'To add state to functional components',
      'To create class components',
      'To style React components',
      'To handle routing in React'
    ],
    correctAnswer: 'To add state to functional components',
    explanation: 'React hooks allow functional components to use state and other React features without writing a class component.'
  },
  {
    id: '2',
    text: 'Explain the concept of React Virtual DOM in your own words.',
    timeLimit: 30,
    type: 'text',
    correctAnswer: 'The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance by minimizing direct manipulation of the browser DOM.',
    explanation: 'A good explanation should mention that it\'s a representation of the UI kept in memory and synced with the real DOM through a process called reconciliation.'
  },
  {
    id: '3',
    text: 'Which hook is used for side effects in React?',
    timeLimit: 30,
    type: 'mcq',
    options: [
      'useEffect',
      'useState',
      'useContext',
      'useReducer'
    ],
    correctAnswer: 'useEffect',
    explanation: 'useEffect is used for handling side effects like data fetching, subscriptions, or DOM manipulation.'
  }
];