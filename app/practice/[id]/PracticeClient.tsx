"use client";

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MCQ from '../../../components/practice/MCQ';
import Reading from '../../../components/practice/Reading';
import FillBlanks from '../../../components/practice/FillBlanks';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function PracticeClient({ id }: { id: string }) {
  const { user, loading, userData } = useAuth();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  if (loading) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;
  if (!user) {
    router.push('/');
    return null;
  }

  const handleComplete = async (xp: number) => {
    setEarnedXp(xp);
    setCompleted(true);

    try {
      const userRef = doc(db, 'users', user.uid);

      let newTotalXp = (userData?.totalXp || 0) + xp;
      let newLevel = Math.floor(newTotalXp / 100) + 1; // 1 level every 100 XP

      await updateDoc(userRef, {
        totalXp: increment(xp),
        currentLevel: newLevel
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const renderPractice = () => {
    if (completed) {
      return (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
          <h2>Great Job!</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--accent-secondary)', marginBottom: '24px' }}>
            You earned +{earnedXp} XP
          </p>
          <Link href="/dashboard" className="btn-primary">Back to Dashboard</Link>
        </div>
      );
    }

    switch (id) {
      case 'mcq':
        return <MCQ onComplete={() => handleComplete(10)} />;
      case 'reading':
        return <Reading onComplete={() => handleComplete(15)} />;
      case 'fill-blanks':
        return <FillBlanks onComplete={() => handleComplete(10)} />;
      default:
        return <div>Practice module not found.</div>;
    }
  };

  const titleMap: Record<string, string> = {
    'mcq': 'Grammar MCQ',
    'reading': 'Reading Comprehension',
    'fill-blanks': 'Fill in the Blanks'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="container">
        <Link href="/dashboard" className="nav-logo" style={{ fontSize: '1.25rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
      </nav>
      <main className="container" style={{ flex: 1, padding: '40px 24px', maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '8px' }}>{titleMap[id] || 'Practice'}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Complete the exercise below to earn XP.</p>

        {renderPractice()}
      </main>
    </div>
  );
}
