"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to FIRSTep!', desc: 'Get started with your first course today.', icon: '🎉', isRead: false }
  ]);
  const autoCloseTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isNotificationsOpen) {
      autoCloseTimerRef.current = setTimeout(() => {
        setIsNotificationsOpen(false);
      }, 5000);
      return () => {
        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      };
    }
  }, [isNotificationsOpen]);

  const handlePopupMouseEnter = () => {
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
  };

  const handlePopupMouseLeave = () => {
    if (isNotificationsOpen) {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = setTimeout(() => {
        setIsNotificationsOpen(false);
      }, 5000);
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    setMounted(true);

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
        } catch (error) {
          console.error("Error saving user to firestore", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('isLoggedIn');
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div style={{ backgroundColor: 'var(--banner-bg, #a855f7)', color: 'white', textAlign: 'center', padding: '8px', fontSize: '0.8rem', fontWeight: '500' }}>
        Get a free starter guide when you sign up for any of our <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>courses</span>.
      </div>
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color, white)', zIndex: 10, position: 'relative' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '1.25rem' }}>
            <div style={{ width: '85px', height: '35px', backgroundColor: 'var(--btn-bg)', borderRadius: '2%', color: 'var(--btn-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>FIRST</div>
            ep.
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', fontWeight: '600' }}>
          <Link href="#">LMS</Link>
          <Link href="#">Courses</Link>
          <Link href="/about-us">About Us</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.9rem', fontWeight: '600' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Notification Icon */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileMenuOpen(false); }} style={{ width: '44px', height: '44px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--card-bg, #f3f4f6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', transition: 'transform 0.2s ease', transform: isNotificationsOpen ? 'scale(0.95)' : 'scale(1)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted, #6b7280)" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  {unreadCount > 0 && <div style={{ position: 'absolute', top: '10px', right: '12px', width: '8px', height: '8px', backgroundColor: 'red', borderRadius: '50%', border: '2px solid var(--card-bg, #f3f4f6)' }}></div>}
                </button>
                
                {/* Notifications Dropdown */}
                <div onMouseEnter={handlePopupMouseEnter} onMouseLeave={handlePopupMouseLeave} style={{ position: 'absolute', top: 'calc(100% + 12px)', right: '-40px', width: '320px', backgroundColor: 'var(--card-bg, white)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', padding: '16px', zIndex: 50, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', opacity: isNotificationsOpen ? 1 : 0, transform: isNotificationsOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)', pointerEvents: isNotificationsOpen ? 'auto' : 'none', transformOrigin: 'top right' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Notifications</h3>
                    {unreadCount > 0 && (
                      <span onClick={markAllAsRead} style={{ fontSize: '0.8rem', color: 'var(--banner-bg, #a855f7)', cursor: 'pointer', fontWeight: '600' }}>Mark all as read</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {notifications.length > 0 ? notifications.map(notif => (
                      <div key={notif.id} style={{ display: 'flex', gap: '12px', padding: '8px', borderRadius: '8px', backgroundColor: notif.isRead ? 'transparent' : 'rgba(0,0,0,0.02)', cursor: 'pointer', transition: 'background-color 0.2s', opacity: notif.isRead ? 0.6 : 1 }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{notif.icon}</div>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '2px' }}>{notif.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{notif.desc}</div>
                        </div>
                      </div>
                    )) : (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>No notifications</div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div style={{ position: 'relative' }}>
                <div onClick={() => { setIsProfileMenuOpen(!isProfileMenuOpen); setIsNotificationsOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--card-bg, #f3f4f6)', padding: '6px 12px 6px 6px', borderRadius: '24px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', transition: 'background-color 0.2s ease' }}>
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted, #6b7280)" strokeWidth="2" style={{ transition: 'transform 0.3s ease', transform: isProfileMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                
                {/* Profile Dropdown */}
                <div style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: '220px', backgroundColor: 'var(--card-bg, white)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', padding: '8px', zIndex: 50, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', opacity: isProfileMenuOpen ? 1 : 0, transform: isProfileMenuOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)', pointerEvents: isProfileMenuOpen ? 'auto' : 'none', transformOrigin: 'top right' }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.displayName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsProfileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'background-color 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '8px', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', transition: 'background-color 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', fontWeight: '600' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
