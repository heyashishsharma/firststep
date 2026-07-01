"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Using the standard alias or relative, I will use relative just in case: '../../lib/firebase'

// Wait, looking at the user's previous code, they used '../../context/AuthContext'.
// I'll stick to 'firebase/auth' and onAuthStateChanged to be safe and robust without depending on contexts I haven't fully read.
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    import('../../lib/firebase').then(({ auth }) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          router.replace('/');
        } else {
          setUser(currentUser);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    });
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Loading...</div>
      </div>
    );
  }

  if (!user) return null; // Wait for redirect



  return (
    <div style={{ flex: 1, display: 'flex', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'var(--font-main)', overflow: 'hidden' }}>
      
      {/* Left Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'var(--card-bg)', borderRight: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%', flexShrink: 0, padding: '24px 20px', overflowY: 'auto' }}>


        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px', letterSpacing: '0.5px' }}>Overview</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
          {[
            { name: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: true },
            { name: 'My Class', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z', active: false },
            { name: 'My Courses', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', active: false },
            { name: 'Events', icon: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18', active: false },
            { name: 'Explore', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', active: false },
            { name: 'Reports', icon: 'M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z', active: false },
            { name: 'Instructors', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', active: false },
            { name: 'Settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z', active: false },
          ].map((item) => (
            <Link key={item.name} href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', color: item.active ? 'var(--btn-bg)' : 'var(--text-muted)', backgroundColor: item.active ? 'var(--border-color)' : 'transparent', fontWeight: item.active ? '700' : '600', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              {item.name}
            </Link>
          ))}
        </nav>


      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px', backgroundColor: 'var(--bg-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--card-bg)', padding: '10px 16px', borderRadius: '24px', width: '400px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search by topic, title, or name" style={{ border: 'none', outline: 'none', background: 'transparent', marginLeft: '12px', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)', fontFamily: 'var(--font-main)' }} />
          </div>


        </header>

        {/* Dashboard Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '32px', padding: '0 40px 40px 40px' }}>
          
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Hero Banner */}
            <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ maxWidth: '400px', zIndex: 2 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>Unlock 1,000+ Premium Courses Today</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.6' }}>Learn from industry experts with exclusive content designed to boost your skills.</p>
                <button className="btn" style={{ padding: '14px 28px', backgroundColor: 'var(--banner-bg)', color: 'white' }}>
                  Go Premium <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
              <div style={{ position: 'absolute', right: '40px', bottom: '0', zIndex: 1 }}>
                {/* Placeholder Illustration */}
                <svg width="240" height="200" viewBox="0 0 200 200" fill="none">
                  <path d="M40 200V120C40 90 90 90 100 60C110 90 160 90 160 120V200" fill="#f3f4f6"/>
                  <circle cx="100" cy="50" r="40" fill="#e5e7eb"/>
                  <rect x="50" y="160" width="100" height="40" fill="#d1d5db"/>
                  <rect x="70" y="140" width="60" height="30" fill="#9ca3af" rx="4"/>
                </svg>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Courses</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>05/08 <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Complete</span></div>
              </div>
              <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Points Earned</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>80/100 <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Points</span></div>
              </div>
              <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--banner-bg)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" transform="rotate(-90 50 50)"/>
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>75%</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>Progress</span>
                </div>
              </div>
            </div>

            {/* Continue Watching Section */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Continue Watching</h2>
                <button style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>View All</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                
                {/* Video Card 1 */}
                <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: 'var(--image-bg)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>05:10</div>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', width: '100%' }}>
                      <div style={{ height: '100%', backgroundColor: 'var(--banner-bg)', width: '70%' }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>UX/UI for Beginners</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.4' }}>UI & UX Mastery: Design Your First App</h3>
                </div>

                {/* Video Card 2 */}
                <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: 'var(--image-bg)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop" alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>04:35</div>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', width: '100%' }}>
                      <div style={{ height: '100%', backgroundColor: 'var(--banner-bg)', width: '40%' }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Responsive Web Design</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.4' }}>Create Mobile-First Websites from Scratch</h3>
                </div>

                {/* Video Card 3 */}
                <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: 'var(--image-bg)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop" alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>11:35</div>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', width: '100%' }}>
                      <div style={{ height: '100%', backgroundColor: 'var(--banner-bg)', width: '15%' }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Framer Essentials</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.4' }}>Build Interactive Prototypes Like a Pro</h3>
                </div>

              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Events Section */}
            <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Events</h2>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>

              {/* Mini Calendar Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                  <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 4px', borderRadius: '12px', backgroundColor: i === 1 ? '#f3e8ff' : 'transparent', color: i === 1 ? '#9333ea' : 'var(--text-muted)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '4px' }}>{day}</span>
                    <span style={{ fontSize: '1rem', fontWeight: i === 1 ? '800' : '600', color: i === 1 ? '#9333ea' : 'var(--text-main)' }}>{21 + i}</span>
                  </div>
                ))}
              </div>

              {/* Event List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }}>?</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>UI Basics Quiz</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5 quick MCQs on design.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#ffedd5', color: '#ea580c', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Framer Homework</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Make 3 Wireframe</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>CSS Live Code</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Create Interactive card</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#d1fae5', color: '#059669', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>UX Sprint Quiz</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5 T/F on user research</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Quest Section */}
            <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Daily Quest</h2>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Quest 1 */}
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>💎</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Log In 5 Days Straight</h4>
                      <p style={{ fontSize: '0.8rem', color: '#9333ea', fontWeight: '600' }}>+5 Points</p>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--image-bg)', borderRadius: '4px', marginBottom: '12px' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#c084fc', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>5/5 Completed</span>
                    <button style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)', border: 'none', padding: '6px 16px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>Claim Reward</button>
                  </div>
                </div>

                {/* Quest 2 */}
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>🎯</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Ace 3 Quiz Without Retry</h4>
                      <p style={{ fontSize: '0.8rem', color: '#9333ea', fontWeight: '600' }}>+15 Points</p>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '12px' }}>
                    <div style={{ width: '33%', height: '100%', backgroundColor: '#c084fc', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>1/3 Completed</span>
                    <button style={{ backgroundColor: 'var(--image-bg)', color: 'var(--text-muted)', border: 'none', padding: '6px 16px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600' }} disabled>Claim Reward</button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
