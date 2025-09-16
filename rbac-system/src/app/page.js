"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="signin-container"
      >
        <Image
          src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
          alt="Google"
          width={80}
          height={80}
          className="logo-img"
        />

        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-subtitle">
          Sign in with Google to continue
        </p>

        <button
          onClick={() => signIn("google")}
          className="google-btn"
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
    </div>
  );
}
