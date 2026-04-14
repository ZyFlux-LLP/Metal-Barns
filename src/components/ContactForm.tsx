'use client';

import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const PROJECT_TYPES = [
  'Industrial Shed',
  'Warehouse',
  'Commercial Building',
  'Cold Storage',
  'Aircraft Hangar',
  'Other',
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }

      setState('success');
      setForm({ name: '', phone: '', email: '', projectType: '', message: '' });
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--bg-color)',
    border: '1.5px solid var(--border-subtle)',
    borderRadius: '6px',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 700,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
  };

  if (state === 'success') {
    return (
      <div
        style={{
          background: 'var(--bg-color)',
          borderRadius: '12px',
          padding: '3rem 2rem',
          textAlign: 'center',
          border: '1.5px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--brand-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
          Message Sent
        </h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Name */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="cf-name" style={labelStyle}>
            Full Name <span style={{ color: 'var(--brand-blue)' }}>*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Rajesh Kumar"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--brand-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="cf-phone" style={labelStyle}>
            Phone <span style={{ color: 'var(--brand-blue)' }}>*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--brand-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cf-email" style={labelStyle}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--brand-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>

        {/* Project Type */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="cf-project" style={labelStyle}>
            Project Type
          </label>
          <select
            id="cf-project"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--brand-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          >
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="cf-message" style={labelStyle}>
            Message <span style={{ color: 'var(--brand-blue)' }}>*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project — location, size, timeline..."
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--brand-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>
      </div>

      {state === 'error' && (
        <p
          style={{
            marginTop: '1rem',
            color: '#c0392b',
            fontSize: '0.9rem',
            background: 'rgba(192,57,43,0.08)',
            borderRadius: '6px',
            padding: '0.75rem 1rem',
          }}
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        style={{
          marginTop: '1.5rem',
          width: '100%',
          padding: '1rem',
          background: state === 'loading' ? 'rgba(10,75,143,0.6)' : 'var(--brand-blue)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 800,
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
        }}
      >
        {state === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
