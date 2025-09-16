'use client';

import { useState } from 'react';

export default function SendEmailPage() {
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
    <div style={{ padding: 20 }}>
      <h1>Send Email</h1>
      <button onClick={sendEmail}>Send Test Email</button>
      {status && <p>{status}</p>}
    </div>
  );
}
;