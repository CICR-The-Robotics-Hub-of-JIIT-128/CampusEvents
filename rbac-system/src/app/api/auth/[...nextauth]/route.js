import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db("campusevents");
        const collection = db.collection("users");

        const existingUser = await collection.findOne({ email: user.email });
        console.log("User trying to login:", user.email);
        console.log("DB found:", existingUser);

        if (!existingUser) {
          return false; // ❌ deny login if not in DB
        }
        return true;
      } catch (err) {
        console.error("Error in signIn callback:", err);
        return false;
      }
    },

    // 🔑 after successful login → go to dashboard
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
