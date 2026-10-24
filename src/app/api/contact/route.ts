import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

const LIMITS = { name: 100, phone: 30, email: 200, projectType: 100, message: 5000 };

// Returns a trimmed string within the length limit, '' when absent, or null when invalid
const field = (v: unknown, max: number) => {
  if (v == null || v === '') return '';
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return s.length > max ? null : s;
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many enquiries. Please try again later or call us.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = field(body.name, LIMITS.name);
  const phone = field(body.phone, LIMITS.phone);
  const email = field(body.email, LIMITS.email);
  const projectType = field(body.projectType, LIMITS.projectType);
  const message = field(body.message, LIMITS.message);

  if ([name, phone, email, projectType, message].some((v) => v === null)) {
    return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 });
  }
  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Name, phone, and message are required.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 600px;">
      <h2 style="color: #0A4B8F; margin-bottom: 1.5rem;">New Enquiry — Metal Barns India</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 0.5rem 0; color: #555; width: 130px; font-weight: 600;">Name</td><td style="padding: 0.5rem 0;">${esc(name)}</td></tr>
        <tr><td style="padding: 0.5rem 0; color: #555; font-weight: 600;">Phone</td><td style="padding: 0.5rem 0;">${esc(phone)}</td></tr>
        ${email ? `<tr><td style="padding: 0.5rem 0; color: #555; font-weight: 600;">Email</td><td style="padding: 0.5rem 0;">${esc(email)}</td></tr>` : ''}
        ${projectType ? `<tr><td style="padding: 0.5rem 0; color: #555; font-weight: 600;">Project Type</td><td style="padding: 0.5rem 0;">${esc(projectType)}</td></tr>` : ''}
      </table>
      <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #eee;" />
      <h4 style="color: #555; margin-bottom: 0.5rem;">Message</h4>
      <p style="line-height: 1.7; color: #333;">${esc(message).replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email is not configured.' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'MBI Website <website@metalbarns.in>',
    to: (process.env.CONTACT_TO ?? 'avijit@metalbarns.in,jaya@metalbarns.in')
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean),
    replyTo: email || undefined,
    subject: `New Enquiry from ${name}${projectType ? ` — ${projectType}` : ''}`.replace(/[\r\n]+/g, ' '),
    html,
  });

  if (error) {
    console.error('Contact form: Resend error', error);
    return NextResponse.json({ error: 'Could not send your enquiry. Please try again or call us.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
