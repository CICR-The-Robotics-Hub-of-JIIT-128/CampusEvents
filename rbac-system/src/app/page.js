'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [status, setStatus] = useState(null);

  const sendEmail = async () => {
    setStatus('Sending...');
    try {
      const res = await fetch('/api/auth/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'recipient@example.com',
          subject: 'Hello from RBAC system',
          text: 'This is a plain text message',
          html: '<p>This is an <strong>HTML</strong> message</p>',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(`✅ Email sent: ${data.info.messageId}`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setStatus('❌ Failed to send email');
      console.error(err);
    }
  };

  return (
    <div className="page-container" style={{ padding: 20 }}>
      {/* Google Sign-In Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="signin-container"
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 20,
          marginBottom: 40,
          maxWidth: 400,
        }}
      >
        <Image
          src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
          alt="Google"
          width={80}
          height={80}
          className="logo-img"
        />

        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-subtitle">Sign in with Google to continue</p>

        <button
          onClick={() => signIn('google')}
          className="google-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: 4,
            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          <Image
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google logo"
            width={22}
            height={22}
          />
          <span>Sign in with Google</span>
        </button>
      </motion.div>

      {/* Send Email Block */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 20,
          maxWidth: 400,
        }}
      >
        <h2>Send Email</h2>
        <button
          onClick={sendEmail}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Send Test Email
        </button>
        {status && <p style={{ marginTop: 10 }}>{status}</p>}
      </div>
    </div>
  );
}
