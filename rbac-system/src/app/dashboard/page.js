"use client";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
        <h1>Please log in first</h1>
        <a href="/" style={{ color: "#1DB954" }}>Go to Login</a>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Welcome, {session.user?.name || "User"} 👋
      </h1>

      <p>Email: {session.user?.email}</p>
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="Profile"
          style={{ borderRadius: "50%", marginTop: "15px", width: "80px" }}
        />
      )}

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "15px" }}>🔥 Recommended Events</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{
            backgroundColor: "#181818",
            padding: "15px",
            borderRadius: "8px",
            width: "150px",
            textAlign: "center"
          }}>
            <p>AI Workshop</p>
          </div>
          <div style={{
            backgroundColor: "#181818",
            padding: "15px",
            borderRadius: "8px",
            width: "150px",
            textAlign: "center"
          }}>
            <p>Robotics Bootcamp</p>
          </div>
          <div style={{
            backgroundColor: "#181818",
            padding: "15px",
            borderRadius: "8px",
            width: "150px",
            textAlign: "center"
          }}>
            <p>IoT Hackathon</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        style={{
          marginTop: "40px",
          padding: "10px 20px",
          backgroundColor: "#1DB954",
          border: "none",
          borderRadius: "20px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Logout
      </button>
    </div>
  );
}
