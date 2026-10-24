import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req: NextRequest) {
  const { name, phone, email, projectType, message } = await req.json();

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Name, phone, and message are required.' }, { status: 400 });
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
    subject: `New Enquiry from ${name}${projectType ? ` — ${projectType}` : ''}`,
    html,
  });

  if (error) {
    console.error('Contact form: Resend error', error);
    return NextResponse.json({ error: 'Could not send your enquiry. Please try again or call us.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
