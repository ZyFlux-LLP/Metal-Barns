import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Metal Barns India',
  description:
    'Get in touch with Metal Barns India. Registered office in Nagpur, Maharashtra. Call +91 76200 44077 or email info@metalbarns.in.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-slide-3.webp" alt="Contact MBI" className="page-header-bg" />
        <div className="page-header-overlay" />
        <div className="page-header-content">
          <p className="page-header-eyebrow">Let&apos;s Build Together</p>
          <h1 className="page-header-title">
            Contact
            <br />
            MBI.
          </h1>
        </div>
      </div>

      {/* Contact Details + Form */}
      <section style={{ background: 'var(--bg-secondary)', padding: '8vw 4vw' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
        {/* CTA */}
        <div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Ready to Build{' '}
            <span style={{ color: 'var(--brand-blue)' }}>Something Great?</span>
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '500px',
            }}
          >
            From initial concept to final handover, Metal Barns India manages the entire lifecycle
            of your steel building project. Reach out and let&apos;s discuss your requirements.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="tel:+917620044077"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--text-main)',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--brand-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
              </span>
              +91 76200 44077
            </a>
            <a
              href="mailto:info@metalbarns.in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--brand-blue)',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(10,75,143,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brand-blue)"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              info@metalbarns.in
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
            }}
          >
            Send Us a <span style={{ color: 'var(--brand-blue)' }}>Message</span>
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Fill in your details and we&apos;ll reach out within one business day.
          </p>
          <ContactForm />
        </div>
        </div>
      </section>

    </>
  );
}
