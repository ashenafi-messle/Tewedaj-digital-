import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Check } from 'lucide-react';

interface LanguageToggleProps {
  compact?: boolean;
  variant?: 'light' | 'dark' | 'outline';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ compact = false, variant = 'outline' }) => {
  const { language, setLanguage, toggleLanguage } = useApp();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: variant === 'dark' ? 'rgba(56, 33, 15, 0.9)' : '#FFF8E7',
        border: '1px solid rgba(217, 154, 32, 0.35)',
        borderRadius: '20px',
        padding: '3px',
        boxShadow: '0 2px 5px rgba(56, 33, 15, 0.05)',
        userSelect: 'none'
      }}
    >
      <button
        onClick={() => setLanguage('en')}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: compact ? '6px 10px' : '6px 12px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          fontSize: compact ? '0.8rem' : '0.85rem',
          fontWeight: language === 'en' ? 800 : 500,
          backgroundColor: language === 'en' ? '#38210F' : 'transparent',
          color: language === 'en' ? '#F4C542' : (variant === 'dark' ? '#FAF5E8' : '#5A4634'),
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}
        title="English"
      >
        <span style={{ fontSize: '0.9rem' }}>🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        onClick={() => setLanguage('am')}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: compact ? '6px 10px' : '6px 12px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          fontSize: compact ? '0.8rem' : '0.85rem',
          fontWeight: language === 'am' ? 800 : 500,
          backgroundColor: language === 'am' ? '#38210F' : 'transparent',
          color: language === 'am' ? '#F4C542' : (variant === 'dark' ? '#FAF5E8' : '#5A4634'),
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}
        title="አማርኛ (Amharic)"
      >
        <span style={{ fontSize: '0.9rem' }}>🇪🇹</span>
        <span>አማርኛ</span>
      </button>
    </div>
  );
};
