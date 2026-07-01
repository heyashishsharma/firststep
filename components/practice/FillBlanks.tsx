"use client";

import React, { useState } from 'react';

const exercises = [
  {
    textBefore: "She decided to ",
    blank: "buy",
    textAfter: " a new car tomorrow.",
    options: ["buy", "buying", "bought"]
  },
  {
    textBefore: "The cat jumped ",
    blank: "over",
    textAfter: " the fence gracefully.",
    options: ["under", "over", "through"]
  }
];

export default function FillBlanks({ onComplete }: { onComplete: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (opt: string) => {
    if (isCorrect !== null) return;
    setSelected(opt);
    const correct = opt === exercises[currentQ].blank;
    setIsCorrect(correct);
  };

  const nextQuestion = () => {
    if (currentQ < exercises.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  const ex = exercises[currentQ];

  return (
    <div className="glass-card animate-fade-in">
      <div style={{ marginBottom: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Sentence {currentQ + 1} of {exercises.length}
      </div>
      
      <div style={{ 
        fontSize: '1.5rem', 
        marginBottom: '40px', 
        lineHeight: '2',
        background: 'rgba(0,0,0,0.2)',
        padding: '32px',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        {ex.textBefore}
        <span style={{
          display: 'inline-block',
          minWidth: '100px',
          borderBottom: `3px solid ${isCorrect === true ? 'var(--accent-secondary)' : isCorrect === false ? 'var(--accent-error)' : 'var(--text-primary)'}`,
          padding: '0 8px',
          color: isCorrect === true ? 'var(--accent-secondary)' : isCorrect === false ? 'var(--accent-error)' : 'var(--accent-primary)',
          fontWeight: 'bold',
          margin: '0 8px'
        }}>
          {selected || '___'}
        </span>
        {ex.textAfter}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {ex.options.map((opt, i) => {
          let bgColor = 'rgba(255, 255, 255, 0.05)';
          let borderColor = 'var(--border-glass)';

          if (selected === opt) {
            if (isCorrect) {
              bgColor = 'rgba(16, 185, 129, 0.2)';
              borderColor = 'var(--accent-secondary)';
            } else {
              bgColor = 'rgba(239, 68, 68, 0.2)';
              borderColor = 'var(--accent-error)';
            }
          } else if (selected !== null && opt === ex.blank) {
            bgColor = 'rgba(16, 185, 129, 0.2)';
            borderColor = 'var(--accent-secondary)';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              style={{
                background: bgColor,
                border: `1px solid ${borderColor}`,
                padding: '16px',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1.125rem',
                cursor: selected === null ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <button className="btn-primary" onClick={nextQuestion} style={{ width: '100%' }}>
          {currentQ < exercises.length - 1 ? 'Next Sentence' : 'Complete Practice'}
        </button>
      )}
    </div>
  );
}
