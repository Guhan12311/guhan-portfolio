import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// MongoDB connection (optional — saves contacts to DB)
let isConnected = false;
async function connectDB() {
  if (isConnected || !process.env.MONGODB_URI) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

// Simple contact schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Save to MongoDB if configured
    await connectDB();
    if (isConnected) {
      await Contact.create({ name, email, subject, message });
    }

    // Send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      // Email to Guhan
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020408;color:#e8eaf0;padding:24px;border-radius:12px;border:1px solid rgba(0,245,255,0.2)">
            <h2 style="color:#00f5ff;font-family:monospace">📬 New Portfolio Message</h2>
            <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px;margin:16px 0">
              <p><strong style="color:#00f5ff">From:</strong> ${name} (${email})</p>
              <p><strong style="color:#00f5ff">Subject:</strong> ${subject || 'No subject'}</p>
              <p><strong style="color:#00f5ff">Message:</strong></p>
              <p style="white-space:pre-wrap">${message}</p>
            </div>
            <p style="color:rgba(255,255,255,0.4);font-size:12px">Sent from guhan.dev portfolio</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out! — Guhan A',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020408;color:#e8eaf0;padding:24px;border-radius:12px;border:1px solid rgba(0,245,255,0.2)">
            <h2 style="color:#00f5ff;font-family:monospace">Hey ${name}! 👋</h2>
            <p>Thanks for getting in touch. I've received your message and will get back to you within 24 hours.</p>
            <div style="background:rgba(0,245,255,0.05);border-left:2px solid #00f5ff;padding:12px 16px;margin:16px 0">
              <p style="color:rgba(255,255,255,0.6);font-style:italic">"${message.slice(0, 100)}${message.length > 100 ? '...' : ''}"</p>
            </div>
            <p>Meanwhile, feel free to check out my projects on <a href="https://github.com/guhan-a" style="color:#00f5ff">GitHub</a>.</p>
            <p style="color:rgba(255,255,255,0.6)">— Guhan A<br>Full Stack & Generative AI Developer</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send message' }, { status: 500 });
  }
}
