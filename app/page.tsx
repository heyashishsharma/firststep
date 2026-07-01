"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, setDoc, collection, getCountFromServer } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [userCount, setUserCount] = useState<number>(0);
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      router.replace('/dashboard');
      return;
    }
    setIsInitializing(false);

    const fetchUserCount = async () => {
      try {
        const coll = collection(db, 'users');
        const snapshot = await getCountFromServer(coll);
        setUserCount(snapshot.data().count);
      } catch (error) {
        console.error("Error fetching user count", error);
      }
    };
    fetchUserCount();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser as User);
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          await setDoc(userRef, {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            lastLogin: new Date()
          }, { merge: true });

          fetchUserCount();
        } catch (error) {
          console.error("Error saving user to firestore", error);
        }
        router.replace('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);



  if (isInitializing) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero Section */}
      <section className="container" style={{ position: 'relative', textAlign: 'center', paddingTop: '100px', paddingBottom: '100px', flex: 1, overflow: 'hidden' }}>
        <h1 className="hero-title">
          Level up your mind.<br /> No limits<span style={{ position: 'relative' }}> apply. <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,0 100,5" stroke="#34d399" strokeWidth="4" fill="none" strokeLinecap="round" /></svg></span>
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Unlock your next skill instantly. Whether you're mastering English, prepping for exams, or learning Photoshop, conquer your goals with interactive challenges and personalized AI learning paths.
        </p>

        <button className="btn" style={{ padding: '16px 32px', fontSize: '1rem', marginBottom: '24px' }}>
          View courses
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex' }}>
            {[1, 2, 3].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--bg-color)', marginLeft: i > 1 ? '-12px' : '0' }} />
            ))}
          </div>
          Trusted by {userCount > 0 ? `${userCount}+` : '4,000+'} people.
        </div>

        {/* Floating Avatars */}
        <div className="floating-shape shape-circle float-left-1" style={{ width: '90px', height: '90px', backgroundColor: '#6366f1' }}>
          <img src="https://i.pravatar.cc/150?img=32" alt="Student" style={{ width: '100%', height: '90%', objectFit: 'cover' }} />
        </div>

        <div className="floating-shape shape-triangle float-left-2" style={{ width: '110px', height: '110px', backgroundColor: '#f472b6' }}>
          <img src="https://i.pravatar.cc/150?img=11" alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>

        <div className="floating-shape shape-square float-left-3" style={{ width: '80px', height: '80px', backgroundColor: '#bef264' }}>
          <img src="https://i.pravatar.cc/150?img=12" alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>

        <div className="floating-shape shape-circle float-right-1" style={{ width: '80px', height: '80px', backgroundColor: '#2dd4bf' }}>
          <img src="https://i.pravatar.cc/150?img=5" alt="Student" style={{ width: '100%', height: '90%', objectFit: 'cover' }} />
        </div>

        <div className="floating-shape shape-square float-right-2" style={{ width: '100px', height: '100px', backgroundColor: '#fde047' }}>
          <img src="https://i.pravatar.cc/150?img=47" alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>

        <div className="floating-shape shape-triangle float-right-3" style={{ width: '120px', height: '120px', backgroundColor: '#fb923c' }}>
          <img src="https://i.pravatar.cc/150?img=59" alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>
      </section>

      {/* Courses Section */}
      <section className="container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>Browse our most popular courses.</h2>
          <a href="#" style={{ fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            View all
            <div style={{ width: '20px', height: '20px', backgroundColor: '#111', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ backgroundColor: '#6366f1', height: '180px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
            </div>
            <div style={{ padding: '0 12px 12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>Real Estate Investing Secrets</h3>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 18 hours</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg> 40 sections</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> Expert level</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
                Learn how to evaluate properties, analyze market trends, negotiate deals and finance investments.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>$ 209.00</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>USD</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>incl. taxes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-sm">Enroll now</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid white', marginLeft: i > 1 ? '-10px' : '0' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>215 enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ backgroundColor: '#6ee7b7', height: '180px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#065f46' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 5h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM9 4h6v1H9V4zm10 16H5V7h2v14h10V7h2v13z" /></svg>
            </div>
            <div style={{ padding: '0 12px 12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>Retirement Planning Made Easy</h3>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 30 hours</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg> 72 sections</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> Beginner level</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
                Understand different retirement accounts, estimate retirement needs and optimize savings.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>$ 69.00</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>USD</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>incl. taxes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-sm">Enroll now</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i + 25}`} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid white', marginLeft: i > 1 ? '-10px' : '0' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>112 enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ backgroundColor: '#fde047', height: '180px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#854d0e' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
            </div>
            <div style={{ padding: '0 12px 12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>Passive Income Blueprint</h3>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 10 hours</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg> 23 sections</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> Intermediate level</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
                Discover various passive income opportunities such as dividend investing and rental properties.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>$ 129.00</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>USD</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>incl. taxes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-sm">Enroll now</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid white', marginLeft: i > 1 ? '-10px' : '0' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>280 enrolled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
