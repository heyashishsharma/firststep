"use client";

import React, { useState } from 'react';

const story = `
The sun was setting behind the mountains, painting the sky in shades of orange and purple. 
Emma sat by the window, sipping her tea and watching the birds fly back to their nests. 
It had been a long, tiring day at the office, but the peaceful view outside made her forget 
all her worries. She picked up her favorite book and began to read.
`;

const questions = [
  {
    question: "What was Emma doing by the window?",
    options: ["Drinking coffee", "Sipping tea", "Eating dinner"],
    answer: 1
  },
  {
    question: "How did the day at the office feel for Emma?",
    options: ["Relaxing", "Exciting", "Long and tiring"],
    answer: 2
  }
];

export default function Reading({ onComplete }: { onComplete: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (index: number) => {
    if (isCorrect !== null) return;
    setSelected(index);
    const correct = index === questions[currentQ].answer;
    setIsCorrect(correct);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  const q = questions[currentQ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card animate-fade-in">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Read the passage:</h3>
        <p style={{ lineHeight: '1.8', fontSize: '1rem', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '8px' }}>
          {story}
        </p>
      </div>

      <div className="glass-card animate-fade-in">
        <div style={{ marginBottom: '16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Question {currentQ + 1} of {questions.length}
        </div>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '24px' }}>{q.question}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {q.options.map((opt, i) => {
            let bgColor = 'rgba(255, 255, 255, 0.05)';
            let borderColor = 'var(--border-glass)';

            if (selected === i) {
              if (isCorrect) {
                bgColor = 'rgba(16, 185, 129, 0.2)';
                borderColor = 'var(--accent-secondary)';
              } else {
                bgColor = 'rgba(239, 68, 68, 0.2)';
                borderColor = 'var(--accent-error)';
              }
            } else if (selected !== null && i === q.answer) {
              bgColor = 'rgba(16, 185, 129, 0.2)';
              borderColor = 'var(--accent-secondary)';
            }

            return (
              <button 
                key={i} 
                onClick={() => handleSelect(i)}
                style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  borderRadius: '8px',
                  color: 'white',
                  textAlign: 'left',
                  cursor: selected === null ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <button className="btn-primary" onClick={nextQuestion} style={{ width: '100%' }}>
            {currentQ < questions.length - 1 ? 'Next Question' : 'Complete Reading Practice'}
          </button>
        )}
      </div>
    </div>
  );
}
