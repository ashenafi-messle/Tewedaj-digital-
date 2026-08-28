'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useApp();
  const isAm = language === 'am';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'merchant',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--cream-primary)', minHeight: '80vh', padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            backgroundColor: 'var(--surface-elevated)',
            color: 'var(--gold-primary)',
            border: '1px solid var(--border-subtle)',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {isAm ? 'አግኙን' : 'CONTACT US'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.6rem', color: 'var(--brown-dark)', margin: '14px 0 12px' }}>
            {isAm ? 'ከተወዳጅ የድጋፍ ቡድን ጋር ይገናኙ' : 'Get in Touch with TEWEDAJ'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            {isAm 
              ? 'ስለ ነጋዴዎች ምዝገባ፣ የጅምላ አቅርቦት ትብብር ወይም የባንክ ውህደት ማንኛውም ጥያቄ አለዎት?' 
              : 'Have questions regarding merchant onboarding, wholesale partnerships, or integration with your financial institution?'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {/* Info Card */}
          <div className="card" style={{ backgroundColor: 'var(--surface-elevated)' }}>
            <h3 style={{ color: 'var(--brown-dark)', marginBottom: '20px' }}>
              {isAm ? 'የመገናኛ አድራሻዎች' : 'Contact Information'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <MapPin size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--brown-dark)' }}>{isAm ? 'ዋና መሥሪያ ቤት' : 'Headquarters'}</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--text-muted)' }}>
                    {isAm ? 'ቦሌ ክፍለ ከተማ፣ ወረዳ 03፣ አዲስ አበባ፣ ኢትዮጵያ' : 'Bole Sub-City, Woreda 03, Addis Ababa, Ethiopia'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Phone size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--brown-dark)' }}>{isAm ? 'የነጋዴዎች የነጻ ስልክ መስመር' : 'Merchant Helpline'}</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--text-muted)' }}>
                    +251 911 000 789 / 8820 ({isAm ? 'አጭር የነጻ ጥሪ ቁጥር' : 'Toll Free Shortcode'})
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Mail size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--brown-dark)' }}>{isAm ? 'ኢሜይል' : 'Email Inquiries'}</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--text-muted)' }}>
                    support@tewedaj.et / partners@tewedaj.et
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', padding: '16px', backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--brown-dark)', marginBottom: '4px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="var(--gold-primary)" />
                {isAm ? 'የስራ ሰዓት' : 'Working Hours'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isAm 
                  ? 'ከሰኞ – ቅዳሜ: ከጠዋቱ 1:00 – ማታ 2:00' 
                  : 'Monday – Saturday: 7:00 AM – 8:00 PM (EAT)'}<br />
                {isAm 
                  ? 'እሁድ እና በዓላት: ከጠዋቱ 2:00 – ቀኑ 10:00' 
                  : 'Sunday & Holidays: 8:00 AM – 4:00 PM (EAT)'}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E7D32', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ color: 'var(--brown-dark)', marginBottom: '8px' }}>
                  {isAm ? 'መልዕክትዎ ደርሶናል!' : 'Message Received!'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  {isAm 
                    ? 'የአዲስ አበባ የድጋፍ ቡድናችን በ2 ሰዓት ውስጥ በስልክ ወይም በኤስኤምኤስ ያገኝዎታል።' 
                    : 'Our Addis Ababa merchant support team will call or message you within 2 hours.'}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline btn-sm">
                  {isAm ? 'ሌላ መልዕክት ላክ' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--brown-dark)', marginBottom: '16px' }}>
                  {isAm ? 'መልዕክትዎን ይላኩልን' : 'Send Us a Message'}
                </h3>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">{isAm ? 'ሙሉ ስም' : 'Your Name'}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAm ? 'ለምሳሌ: አልማዝ ወልዴ' : 'e.g. Almaz Wolde'}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">{isAm ? 'ስልክ ቁጥር' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 9..."
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">{isAm ? 'የንግድ ዘርፍ / ሚና' : 'Your Role'}</label>
                  <select
                    className="form-select"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="merchant">{isAm ? 'የሰፈር ሱቅ ነጋዴ / ቸርቻሪ' : 'Retail Shopkeeper / Merchant'}</option>
                    <option value="wholesaler">{isAm ? 'የጅምላ አቅራቢ / አስመጪ' : 'Wholesale Distributor'}</option>
                    <option value="delivery">{isAm ? 'የባጃጅ / ካርጎ አጓጓዥ' : 'Bajaj Courier / Delivery Partner'}</option>
                    <option value="customer">{isAm ? 'የአካባቢ ደንበኛ' : 'Local Customer'}</option>
                    <option value="financial">{isAm ? 'ባንክ ወይም አነስተኛ ብድር ተቋም' : 'Financial Institution Partner'}</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label">{isAm ? 'መልዕክትዎ' : 'Message'}</label>
                  <textarea
                    rows={4}
                    required
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isAm ? 'ጥያቄዎን ወይም አስተያየትዎን እዚህ ይጻፉ...' : 'How can we help your business today?'}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> {isAm ? 'መልዕክት ላክ' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
