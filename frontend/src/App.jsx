import { useState } from 'react';
import { Celebration } from './components/Celebration.jsx';
import { questions } from './questions/index.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  if (done) return <Celebration />;

  const question = questions[index];
  const Question = question.Component;

  const handleYes = () => {
    setIndex((current) => {
      if (current >= questions.length - 1) {
        setDone(true);
        return current;
      }
      return current + 1;
    });
  };

  return (
    <Question
      key={question.id}
      question={question}
      index={index}
      total={questions.length}
      onYes={handleYes}
    />
  );
}
