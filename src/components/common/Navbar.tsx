'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

export const Navbar: React.FC = () => {
  const { loginUser, theme } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="public-navbar" style={{
      backgroundColor: isDark ? 'rgba(15, 12, 9, 0.96)' : '#FFF8E7',
      borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(74, 46, 23, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(8px)',
      background: isDark ? 'rgba(15, 12, 9, 0.96)' : 'rgba(255, 248, 231, 0.95)'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
        alignItems: 'center',
        gap: '18px'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none', flexShrink: 0, justifySelf: 'start' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: isDark ? 'linear-gradient(135deg, #FFAA2C 0%, #D97808 100%)' : 'linear-gradient(135deg, #F4C542 0%, #D99A20 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark ? '0 4px 12px rgba(255, 170, 44, 0.4)' : '0 4px 12px rgba(217, 154, 32, 0.3)',
            border: isDark ? '2px solid #0F0C09' : '2px solid #FFF8E7'
          }}>
            <span style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 800,
              fontSize: '1.35rem',
              color: isDark ? '#160D06' : '#38210F',
              lineHeight: 1
            }}>
              T
            </span>
          </div>
          <div>
            <div style={{
              fontFamily: 'Fraunces, serif',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: isDark ? '#FFF4E5' : '#4A2E17',
              letterSpacing: '0.5px',
              lineHeight: 1
            }}>
              TEWEDAJ
            </div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: isDark ? '#FFB94D' : '#4F7D3A',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginTop: '1px'
            }}>
              ተወዳጅ • Digital solution
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '420px',
          whiteSpace: 'nowrap'
        }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? (isDark ? 'rgba(255, 170, 44, 0.12)' : 'rgba(217, 154, 32, 0.12)') : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(74,46,23,0.03)'),
                  border: isActive ? `1px solid ${isDark ? '#FFAA2C' : '#D99A20'}` : `1px solid ${isDark ? 'rgba(255,170,44,0.16)' : 'rgba(74,46,23,0.08)'}`,
                  color: isActive ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? (isDark ? '0 0 0 1px rgba(255,170,44,0.15)' : '0 0 0 1px rgba(217,154,32,0.12)') : 'none'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flexShrink: 0 }} className="desktop-cta">
          <ThemeToggle compact />
          <LanguageToggle compact />
          <Link
            href="/login"
            className="btn btn-outline btn-sm"
            style={{ textDecoration: 'none', fontSize: '1rem', padding: '10px 20px' }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="btn btn-gold btn-sm"
            style={{ textDecoration: 'none', fontSize: '1rem', padding: '10px 20px' }}
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle compact className="mobile-theme-toggle" />
          <div className="mobile-language-toggle" style={{ display: 'none' }}>
            <LanguageToggle compact />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn-icon mobile-menu-btn"
          style={{ display: 'none' }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
          borderBottom: isDark ? '2px solid #FFAA2C' : '2px solid #D99A20',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '10px 0',
                fontSize: '1rem',
                fontWeight: pathname === link.path ? 700 : 500,
                color: pathname === link.path ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
                borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.15)' : '1px solid rgba(74,46,23,0.06)',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-outline"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-gold"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          .mobile-theme-toggle {
            display: inline-flex !important;
          }
          .mobile-language-toggle {
            display: inline-flex !important;
          }
        }

        /* Force navbar elements to not contract on desktop */
        .desktop-cta .btn-sm {
          font-size: 1rem !important;
          padding: 10px 20px !important;
          white-space: nowrap !important;
        }

        .public-navbar {
          min-height: 72px;
        }
      `}</style>
    </header>
  );
};
