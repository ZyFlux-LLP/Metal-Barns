'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/about', label: 'About MBI' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Showcase' },
  { href: '/journey', label: 'Journey' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <Link href="/" className="nav-logo" aria-label="Metal Barns India Home">
          <Image src="/logo.webp" alt="Metal Barns India" width={160} height={40} priority />
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active-link' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          <div
            className="hamburger-line"
          />
          <div
            className="hamburger-line"
          />
          <div
            className="hamburger-line"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu${menuOpen ? ' active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
