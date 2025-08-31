"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#000", color: "#fff", fontFamily: "Arial, sans-serif" }}>
        <SessionProvider>
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <div style={{
              width: "220px",
              backgroundColor: "#121212",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              <h2 style={{ color: "#1DB954", marginBottom: "30px" }}>CampusEvents</h2>
              <a href="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>🏠 Home</a>
              <a href="/events" style={{ color: "#fff", textDecoration: "none" }}>📅 Events</a>
              <a href="/clubs" style={{ color: "#fff", textDecoration: "none" }}>🎵 Clubs</a>
              <a href="/profile" style={{ color: "#fff", textDecoration: "none" }}>👤 Profile</a>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
