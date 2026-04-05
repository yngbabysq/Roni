"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { springPresets } from "@/lib/motion";
import {
  Zap,
  Brain,
  Command,
  CheckCircle2,
  Calendar,
  Timer,
} from "lucide-react";

const stagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: springPresets.gentle },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[--surface-dim] overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[10%] right-[-15%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(192,193,255,0.08) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>

      {/* Floating Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPresets.gentle, delay: 0.2 }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl"
      >
        <div
          className="glass-high rounded-2xl px-5 py-3 flex items-center justify-between"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
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

          <div className="hidden md:flex items-center gap-1">
            {["Features", "Pricing", "Blog"].map((item) => (
              <button
                key={item}
                className="px-3 py-1.5 rounded-xl text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5 text-sm font-medium transition-all duration-200 cursor-pointer font-[family-name:var(--font-inter)]"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-xl text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5 text-sm font-medium transition-all duration-200 font-[family-name:var(--font-inter)] cursor-pointer"
            >
              Log In
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springPresets.snappy}>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold font-[family-name:var(--font-inter)] cursor-pointer"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(99,102,241,0.4)",
                }}
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-44 pb-24 px-8 flex flex-col items-center text-center"
      >
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
              style={{ border: "1px solid rgba(192,193,255,0.15)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[--success] animate-pulse"
                style={{ animationDuration: "2s" }}
              />
              <span className="label-sm text-[--primary]">
                Now in Beta · Free to get started
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3.2rem,9vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.04em] mb-6 font-[family-name:var(--font-manrope)]"
            style={{
              background:
                "linear-gradient(160deg, #ffffff 30%, var(--primary) 65%, var(--vibrant-violet) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Flow State,
            <br />
            Mastered.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-xl text-[--on-surface-variant] mb-10 max-w-xl mx-auto leading-relaxed font-[family-name:var(--font-inter)]"
          >
            The productivity app that adapts to how you think. Tasks, calendar,
            and focus — unified in fluid glass.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={springPresets.snappy}
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-primary text-white font-bold text-base font-[family-name:var(--font-inter)] cursor-pointer"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(99,102,241,0.5)",
                }}
              >
                Start for Free
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={springPresets.snappy}
            >
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-4 rounded-2xl glass text-[--on-surface] font-semibold text-base font-[family-name:var(--font-inter)] cursor-pointer"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            variants={fadeIn}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <div className="flex -space-x-2">
              {["#6366F1", "#8B5CF6", "#A78BFA", "#C0C1FF"].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[--surface-dim]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
              <span className="text-[--on-surface] font-semibold">1,200+</span>{" "}
              in early access
            </span>
          </motion.div>
        </motion.div>

        {/* App mockup */}
        <motion.div
          className="relative z-10 mt-20 w-full max-w-4xl mx-auto"
          style={{ y: mockupY, opacity: mockupOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.6 }}
        >
          <div
            className="rounded-3xl glass-high overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.1)",
            }}
          >
            <div className="bg-[--surface-container-low] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="label-sm text-[--on-surface-variant] mx-auto">
                Task Stream — Inbox
              </span>
            </div>
            <div className="p-6 space-y-2.5">
              {[
                {
                  title: "Design new onboarding flow",
                  tag: "Product",
                  priority: "HIGH",
                  date: "Today",
                  color: "bg-[--electric-indigo]",
                  done: false,
                },
                {
                  title: "Review Q2 roadmap with team",
                  tag: "Work",
                  priority: "CRITICAL",
                  date: "Apr 6",
                  color: "bg-red-500",
                  done: false,
                },
                {
                  title: "Set up Supabase RLS policies",
                  tag: "Dev",
                  priority: "MEDIUM",
                  date: "Apr 8",
                  color: "bg-[--vibrant-violet]",
                  done: true,
                },
                {
                  title: "Write weekly review notes",
                  tag: "Personal",
                  priority: "LOW",
                  date: "Someday",
                  color: "bg-emerald-500",
                  done: false,
                },
              ].map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springPresets.gentle, delay: 0.8 + i * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-xl group transition-colors cursor-pointer ${
                    task.done
                      ? "opacity-40"
                      : "glass hover:bg-white/5"
                  }`}
                  style={
                    !task.done
                      ? { border: "1px solid rgba(255,255,255,0.05)" }
                      : {}
                  }
                >
                  <div
                    className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                      task.done
                        ? "bg-[--primary]/30 border-0"
                        : "border-2 border-white/20 group-hover:border-[--primary]"
                    }`}
                  >
                    {task.done && (
                      <CheckCircle2 className="w-4 h-4 text-[--primary]" />
                    )}
                  </div>
                  <span
                    className={`flex-1 text-sm font-[family-name:var(--font-inter)] ${
                      task.done
                        ? "line-through text-[--on-surface-variant]"
                        : "text-[--on-surface]"
                    }`}
                  >
                    {task.title}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${task.color} flex-shrink-0`}
                  />
                  <span className="label-sm text-[--on-surface-variant] hidden sm:block">
                    {task.priority}
                  </span>
                  <span className="text-xs text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
                    {task.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springPresets.gentle}
            className="text-center mb-14"
          >
            <span className="label-sm text-[--primary] mb-3 block">
              Everything you need
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] font-[family-name:var(--font-manrope)]"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 50%, var(--primary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built for deep work.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "Smart Workflows",
                desc: "Tasks auto-sort into Today, Upcoming, and Someday. Your inbox stays clear — always.",
                accent: "--electric-indigo",
                delay: 0,
              },
              {
                icon: Brain,
                title: "Zen Focus Mode",
                desc: "Full-screen Pomodoro timer that tracks every session and builds your flow score.",
                accent: "--vibrant-violet",
                delay: 0.1,
              },
              {
                icon: Command,
                title: "Swift as Light",
                desc: "⌘K to create anything. Drag tasks to your calendar. Everything at the speed of thought.",
                accent: "--primary",
                delay: 0.2,
              },
              {
                icon: Calendar,
                title: "Unified Calendar",
                desc: "Tasks and events in one view. Drag a task to schedule it. No context switching.",
                accent: "--electric-indigo",
                delay: 0.3,
              },
              {
                icon: Timer,
                title: "Flow Score",
                desc: "Track your focused hours over time. Build streaks. See your productivity evolve.",
                accent: "--vibrant-violet",
                delay: 0.4,
              },
              {
                icon: CheckCircle2,
                title: "Capture Anything",
                desc: "Quick-add from anywhere. Never lose a thought. Everything lands in your inbox.",
                accent: "--primary",
                delay: 0.5,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ ...springPresets.gentle, delay: card.delay }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-6 rounded-2xl glass cursor-pointer"
                  style={{
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: `linear-gradient(135deg, rgba(var(--surface-container-rgb, 32,31,31), 0.9), transparent)`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, var(${card.accent})/20, var(${card.accent})/5)`,
                      border: `1px solid var(${card.accent})/20`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: `var(${card.accent})` }}
                    />
                  </div>
                  <h3 className="text-base font-bold text-[--on-surface] mb-2 font-[family-name:var(--font-manrope)] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[--on-surface-variant] leading-relaxed font-[family-name:var(--font-inter)]">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 text-center relative">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, var(--vibrant-violet), transparent)",
          }}
        />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springPresets.gentle}
        >
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.04em] mb-4 font-[family-name:var(--font-manrope)]"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 40%, var(--primary) 80%, var(--vibrant-violet))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your mind,
            <br />
            evolved.
          </h2>
          <p className="text-lg text-[--on-surface-variant] mb-10 font-[family-name:var(--font-inter)]">
            Join the beta. Free forever. No credit card required.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={springPresets.snappy}
            className="inline-block"
          >
            <Link
              href="/register"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl gradient-primary text-white font-bold text-lg font-[family-name:var(--font-inter)] cursor-pointer"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.2), 0 12px 40px rgba(99,102,241,0.6)",
              }}
            >
              Get Roni Free
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xs font-[family-name:var(--font-manrope)]">
              R
            </span>
          </div>
          <span className="label-sm text-[--on-surface-variant]">
            Roni · Beta
          </span>
        </div>
        <span className="label-sm text-[--on-surface-variant]">
          © 2026 Roni
        </span>
      </footer>
    </div>
  );
}
