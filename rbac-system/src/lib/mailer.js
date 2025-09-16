// src/lib/mailer.js
import nodemailer from 'nodemailer';

export function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASS;
  if (!user || !pass) {
    throw new Error('Set GMAIL_USER and GMAIL_APP_PASS in env');
  }

  // Use TLS on port 587. If you want SSL (port 465) set secure: true and port: 465.
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true if port 465
    auth: {
      user,
      pass,
    },
  });
}