"use client";

import React, { useState } from 'react';

const questions = [
  {
    question: "Which of the following is correct?",
    options: ["He go to school.", "He goes to school.", "He going to school."],
    answer: 1
  },
  {
    question: "I have been living here ___ 2010.",
    options: ["for", "since", "from"],
    answer: 1
  },
  {
    question: "Select the synonym for 'Happy'",
    options: ["Sad", "Joyful", "Angry"],
    answer: 1
  }
];

export default function MCQ({ onComplete }: { onComplete: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (index: number) => {
    if (isCorrect !== null) return; // Prevent changing after answer
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
    <div className="glass-card animate-fade-in">
      <div style={{ marginBottom: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Question {currentQ + 1} of {questions.length}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>{q.question}</h3>
      
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
            // Show correct answer if they got it wrong
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
                fontSize: '1rem'
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button className="btn-primary" onClick={nextQuestion} style={{ width: '100%' }}>
          {currentQ < questions.length - 1 ? 'Next Question' : 'Complete Practice'}
        </button>
      )}
    </div>
  );
}
