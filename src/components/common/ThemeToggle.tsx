'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false, className = '' }) => {
  const { theme, toggleTheme, language } = useApp();
  const isDark = theme === 'dark';

  const title = isDark
    ? (language === 'am' ? 'ወደ ብሩህ ገጽታ ቀይር' : 'Switch to Light Mode')
    : (language === 'am' ? 'ወደ ጨለማ ገጽታ ቀይር' : 'Switch to Dark Mode');

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        className={`theme-toggle-btn ${className}`}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: isDark ? '#3A2410' : '#FAF5E8',
          border: isDark ? '1px solid rgba(255, 170, 44, 0.45)' : '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isDark ? '#FFB94D' : '#38210F',
          transition: 'all 0.2s ease',
        }}
        title={title}
        aria-label={title}
      >
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.82rem',
        fontWeight: 700,
        cursor: 'pointer',
        backgroundColor: isDark ? '#3A2410' : '#FAF5E8',
        color: isDark ? '#FFB94D' : '#38210F',
        border: isDark ? '1px solid rgba(255, 170, 44, 0.45)' : '1px solid rgba(74, 46, 23, 0.12)',
        transition: 'all 0.2s ease',
      }}
      title={title}
      aria-label={title}
    >
      {isDark ? <Sun size={15} color="#FFB94D" /> : <Moon size={15} color="#38210F" />}
      <span>{isDark ? (language === 'am' ? 'ብሩህ' : 'Light') : (language === 'am' ? 'ጨለማ' : 'Dark')}</span>
    </button>
  );
};
