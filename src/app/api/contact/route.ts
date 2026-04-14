import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, phone, email, projectType, message } = await req.json();

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Name, phone, and message are required.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family: sans-serif; max-width: 600px;">
      <h2 style="color: #0A4B8F; margin-bottom: 1.5rem;">New Enquiry — Metal Barns India</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 0.5rem 0; color: #555; width: 130px; font-weight: 600;">Name</td><td style="padding: 0.5rem 0;">${name}</td></tr>
        <tr><td style="padding: 0.5rem 0; color: #555; font-weight: 600;">Phone</td><td style="padding: 0.5rem 0;">${phone}</td></tr>
        ${email ? `<tr><td style="padding: 0.5rem 0; color: #555; font-weight: 600;">Email</td><td style="padding: 0.5rem 0;">${email}</td></tr>` : ''}
        ${projectType ? `<tr><td style="padding: 0.5rem 0; color: #555; font-weight: 600;">Project Type</td><td style="padding: 0.5rem 0;">${projectType}</td></tr>` : ''}
      </table>
      <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #eee;" />
      <h4 style="color: #555; margin-bottom: 0.5rem;">Message</h4>
      <p style="line-height: 1.7; color: #333;">${message.replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"MBI Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO ?? 'info@metalbarns.in',
    replyTo: email || undefined,
    subject: `New Enquiry from ${name}${projectType ? ` — ${projectType}` : ''}`,
    html,
  });

  return NextResponse.json({ ok: true });
}
