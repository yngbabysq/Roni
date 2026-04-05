"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { springPresets } from "@/lib/motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--surface-dim] flex flex-col overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)",
          }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div
          className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(192,193,255,0.06) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,193,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,193,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPresets.gentle, delay: 0.1 }}
        className="relative z-10 px-8 py-5"
      >
        <Link href="/" className="flex items-center gap-2.5 w-fit cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={springPresets.snappy}
            className="w-7 h-7 rounded-xl gradient-primary flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm font-[family-name:var(--font-manrope)]">
              R
            </span>
          </motion.div>
          <span className="text-[--on-surface] font-bold text-base font-[family-name:var(--font-manrope)] tracking-tight">
            Roni
          </span>
        </Link>
      </motion.nav>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
