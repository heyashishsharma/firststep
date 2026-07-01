"use client";
import React from 'react';

export default function AboutUs() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}>
      <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ maxWidth: '750px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
              Empowering Your <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Curiosity</span>, <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Through</span>, Interactive<span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}> Learning </span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', maxWidth: '650px' }}>
              At FIRSTep., we transform passive studying into instantly rewarding, active learning experiences.<span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>From competitive exams to high-income creative skills,</span>we provide the exact tools you need to succeed. <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Bridge the gap between your highest ambitions and </span>real-world mastery today.
            </p>
          </div>

          <div style={{ width: '250px', height: '250px', position: 'relative', marginTop: '-20px' }}>
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', color: '#ccc' }}>
              <circle cx="160" cy="40" r="10" stroke="currentColor" strokeWidth="1" />
              <circle cx="160" cy="40" r="30" stroke="currentColor" strokeWidth="1" />
              <circle cx="160" cy="40" r="50" stroke="currentColor" strokeWidth="1" />
              <circle cx="160" cy="40" r="70" stroke="currentColor" strokeWidth="1" />
              <circle cx="160" cy="40" r="90" stroke="currentColor" strokeWidth="1" />
              <circle cx="160" cy="40" r="110" stroke="currentColor" strokeWidth="1" />

              <path d="M10 130 C 30 180, 50 170, 70 120 C 90 70, 110 130, 130 150 C 160 170, 180 100, 160 45" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M152 55 L 160 45 L 170 52" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Team Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

          {/* Card 1 */}
          <div>
            <div style={{ position: 'relative', backgroundColor: '#e5e7eb', height: '360px', marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.4, color: 'white' }}>
                <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="50" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="65" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
              <img src="/founder.bmp" alt="Ashish Sharma" style={{ width: '80%', height: '90%', objectFit: 'cover', objectPosition: 'top', position: 'relative', zIndex: 1 }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Ashish Sharma</h3>
            <p style={{ color: '#555', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>Founder & CEO</p>
          </div>

          {/* Card 2 */}
          <div>
            <div style={{ position: 'relative', backgroundColor: '#e5e7eb', height: '360px', marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.4, color: 'white' }}>
                {[...Array(24)].map((_, i) => (
                  <line key={i} x1="50" y1="50" x2={50 + 60 * Math.cos(i * 15 * Math.PI / 180)} y2={50 + 60 * Math.sin(i * 15 * Math.PI / 180)} stroke="currentColor" strokeWidth="0.5" />
                ))}
              </svg>
              <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400&h=450" alt="Phoenix Baker" style={{ width: '85%', height: '90%', objectFit: 'cover', objectPosition: 'top', position: 'relative', zIndex: 1 }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Phoenix Baker</h3>
            <p style={{ color: '#555', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>Head of Engineering</p>
          </div>

          {/* Card 3 */}
          <div>
            <div style={{ position: 'relative', backgroundColor: '#e5e7eb', height: '360px', marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.4, color: 'white' }}>
                <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M50 25 L75 50 L50 75 L25 50 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M50 40 L60 50 L50 60 L40 50 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M50 -5 L105 50 L50 105 L-5 50 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=450" alt="Lana Steiner" style={{ width: '80%', height: '90%', objectFit: 'cover', objectPosition: 'top', position: 'relative', zIndex: 1 }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>Lana Steiner</h3>
            <p style={{ color: '#555', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>Chief Operating Office</p>
          </div>

        </div>
      </div>
    </div>
  );
}
