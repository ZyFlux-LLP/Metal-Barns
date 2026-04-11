# GSAP Animation System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Coordinate all intro animations via a custom `mbi:loaded` DOM event and fill scroll animation gaps in Footer and MarqueeSection.

**Architecture:** Loader fires `mbi:loaded` when complete. Navbar hides itself on mount and reveals on the event. HeroSection swaps its hardcoded `delay: 3.2` for the same event. Footer and MarqueeSection get scroll-triggered animations using their existing class hooks.

**Tech Stack:** GSAP (already installed), gsap/ScrollTrigger, React useEffect/useRef, Next.js App Router

---

### Task 1: Fire `mbi:loaded` from Loader

**Files:**
- Modify: `src/components/Loader.tsx`

- [ ] **Step 1: Add event dispatch in onComplete**

In `src/components/Loader.tsx`, update the `onComplete` callback in the GSAP timeline. Replace:

```ts
onComplete: () => {
  document.body.style.overflow = '';
  if (loaderRef.current) {
    loaderRef.current.style.display = 'none';
  }
},
```

With:

```ts
onComplete: () => {
  document.body.style.overflow = '';
  if (loaderRef.current) {
    loaderRef.current.style.display = 'none';
  }
  window.dispatchEvent(new CustomEvent('mbi:loaded'));
},
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Loader.tsx
git commit -m "feat: dispatch mbi:loaded event when loader completes"
```

---

### Task 2: Navbar entrance animation

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Add navRef and GSAP entrance**

In `src/components/Navbar.tsx`:

1. Add `navRef` import and ref — update the imports at the top:

```ts
import { useEffect, useRef, useState } from 'react';
```

2. Inside the `Navbar` component, add the ref (after the existing state declarations):

```ts
const navRef = useRef<HTMLElement>(null);
```

3. Add a new `useEffect` (place it after the existing scroll useEffect):

```ts
useEffect(() => {
  let gsapInstance: typeof import('gsap').gsap | null = null;

  const run = async () => {
    const { gsap } = await import('gsap');
    gsapInstance = gsap;

    // Hide nav immediately so it's not visible during loader
    gsap.set(navRef.current, { y: -60, opacity: 0 });

    const handler = () => {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mbi:loaded', handler);

    return () => {
      window.removeEventListener('mbi:loaded', handler);
    };
  };

  let cleanup: (() => void) | undefined;
  run().then((fn) => { cleanup = fn; });

  return () => cleanup?.();
}, []);
```

4. Add `ref={navRef}` to the `<nav>` element:

```tsx
<nav ref={navRef} className={[scrolled ? 'nav-scrolled' : '', pathname === '/' ? 'nav-home' : ''].filter(Boolean).join(' ')}>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add navbar entrance animation on mbi:loaded event"
```

---

### Task 3: HeroSection — event-driven instead of hardcoded delay

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Replace delay with event listener**

In `src/components/HeroSection.tsx`, replace the entire GSAP `useEffect` with:

```ts
useEffect(() => {
  let cleanup: (() => void) | undefined;

  const run = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const handler = () => {
      const tl = gsap.timeline();

      tl.to('.hero-title span', {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      })
        .to(
          '.hero-bottom span',
          { y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
          '-=0.8'
        )
        .to(
          '.hero-stat',
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.6'
        )
        .add(() => {
          stats.forEach((s, i) => {
            const el = statRefs.current[i];
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: s.target,
              duration: 2,
              ease: 'power3.out',
              onUpdate() {
                el.textContent = Math.floor(obj.val).toString();
              },
            });
          });
        }, '-=0.4');

      cleanup = () => tl.kill();
    };

    window.addEventListener('mbi:loaded', handler);

    return () => {
      window.removeEventListener('mbi:loaded', handler);
      cleanup?.();
    };
  };

  let outerCleanup: (() => void) | undefined;
  run().then((fn) => { outerCleanup = fn; });

  return () => outerCleanup?.();
}, []);
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: trigger hero animations via mbi:loaded event"
```

---

### Task 4: Footer scroll animations

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Convert to client component and add scroll animations**

In `src/components/Footer.tsx`, add `'use client';` at the top and add the following import and useEffect:

```ts
'use client';

import { useEffect } from 'react';
```

Add this `useEffect` inside the `Footer` component, before the return:

```ts
useEffect(() => {
  const run = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Footer CTA text mask reveal
    gsap.utils.toArray<HTMLElement>('.footer-cta .text-mask span').forEach((el) => {
      gsap.fromTo(
        el,
        { y: '110%' },
        {
          y: '0%',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: el.closest('.text-mask'), start: 'top 90%' },
        }
      );
    });

    // Footer contact blocks staggered fade-up
    const blocks = gsap.utils.toArray<HTMLElement>('.footer-contact.gsap-fade-up');
    gsap.fromTo(
      blocks,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-top', start: 'top 85%' },
      }
    );
  };

  run();
}, []);
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add scroll animations to footer"
```

---

### Task 5: MarqueeSection label scroll animation

**Files:**
- Modify: `src/components/MarqueeSection.tsx`

- [ ] **Step 1: Add 'use client' and scroll animation**

In `src/components/MarqueeSection.tsx`, add `'use client';` at the top and the following import and useEffect:

```ts
'use client';

import { useEffect } from 'react';
```

Add this `useEffect` inside the `MarqueeSection` component, before the return:

```ts
useEffect(() => {
  const run = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '.marquee-label',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.marquee-container', start: 'top 90%' },
      }
    );
  };

  run();
}, []);
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MarqueeSection.tsx
git commit -m "feat: add scroll animation to marquee label"
```
