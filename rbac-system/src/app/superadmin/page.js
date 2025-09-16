"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // still loading
    if (!session || session.user.role !== "superadmin") {
      router.push("/"); // redirect if not superadmin
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-700">JYC Superadmin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{session?.user?.email}</span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Manage Clubs */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Manage Clubs</h2>
          <p className="text-gray-500 mt-2">Add, edit, or remove club admins.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Go
          </button>
        </div>

        {/* Card: Events */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Events</h2>
          <p className="text-gray-500 mt-2">View and approve club events.</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Go
          </button>
        </div>

        {/* Card: Users */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Users</h2>
          <p className="text-gray-500 mt-2">View all registered members.</p>
          <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Go
          </button>
        </div>
      </main>
    </div>
  );
}
