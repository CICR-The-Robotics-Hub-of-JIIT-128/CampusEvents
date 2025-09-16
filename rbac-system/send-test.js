// send-test.js
import fetch from "node-fetch"; // install if not already: npm install node-fetch

async function main() {
  try {
    const res = await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "you@domain.com", // replace with your email
        subject: "Test Email from Next.js",
        html: "<b>Hello from Next.js 🚀</b>"
      })
    });

    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
