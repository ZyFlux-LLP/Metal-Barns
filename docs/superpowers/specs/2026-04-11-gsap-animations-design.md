# GSAP Animation System — Design Spec

**Date:** 2026-04-11
**Status:** Approved

---

## Goal

Add a coordinated intro animation sequence (post-loader) and fill scroll animation gaps across the site. Match the existing animation style: ~1s durations, `power3/power4.out` eases, text-mask slide-ups, staggered fade-ups.

---

## Coordination Model

The loader is the single source of truth for "intro complete". It fires a custom DOM event when done:

```ts
window.dispatchEvent(new CustomEvent('mbi:loaded'));
```

All intro animations listen for this event instead of using hardcoded delays. This means:
- Timing stays correct if the loader duration ever changes
- No component needs to know about any other component

---

## Changes by File

### 1. `Loader.tsx`
- In the GSAP timeline's `onComplete` callback, after hiding the loader, dispatch `new CustomEvent('mbi:loaded')` on `window`.
- No other changes.

### 2. `Navbar.tsx`
- Add a `navRef` on the `<nav>` element.
- In `useEffect`, immediately call `gsap.set(navRef.current, { y: -60, opacity: 0 })` to hide it before the loader finishes.
- Add a `window.addEventListener('mbi:loaded', handler)` where handler animates: `{ y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }`.
- Clean up the listener on unmount.

### 3. `HeroSection.tsx`
- Remove `delay: 3.2` from the GSAP timeline.
- Wrap the existing timeline in a `mbi:loaded` event listener — identical animation sequence, just event-triggered.
- Clean up listener and timeline on unmount.

### 4. `Footer.tsx`
- Convert to `'use client'`.
- Add `useEffect` with ScrollTrigger animations:
  - `.footer-cta` spans (already have `text-mask` class): text-mask slide-up, `start: 'top 90%'`.
  - `.footer-contact.gsap-fade-up` blocks: staggered fade-up `{ y: 40, opacity: 0 }` → `{ y: 0, opacity: 1 }`, stagger `0.15s`, `start: 'top 85%'`.

### 5. `MarqueeSection.tsx`
- Add `useEffect` with ScrollTrigger:
  - `.marquee-label`: fade-up `{ y: 20, opacity: 0 }` → `{ y: 0, opacity: 1 }`, `duration: 0.8, ease: 'power3.out'`, `start: 'top 90%'`.

---

## What Does NOT Change

- Animation durations/eases — match existing (`power3.out`, `power4.out`, ~0.8–1.2s)
- CSS — no new classes, no style changes
- Markup — no new HTML structure
- Existing scroll animations in About, Services, Projects — untouched

---

## Edge Cases

- **Client-side navigation**: Loader and Navbar mount once in the root layout and persist across route changes. The `mbi:loaded` event fires exactly once on initial page load. Subsequent navigations don't re-hide or re-animate the navbar.
- **Fast connections / no JS delay**: `gsap.set` runs synchronously in `useEffect` before paint, so the navbar won't flash visible before being hidden.
- **ScrollTrigger registration**: Each component that uses ScrollTrigger registers the plugin itself (matches existing pattern).
