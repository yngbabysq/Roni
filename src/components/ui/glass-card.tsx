"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { springPresets } from "@/lib/motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "low" | "high" | "modal";
  interactive?: boolean;
}

export function GlassCard({
  className,
  variant = "default",
  interactive = false,
  children,
  ...props
}: GlassCardProps) {
  const variantClasses = {
    default: "glass light-leak",
    low: "glass-low",
    high: "glass-high light-leak-strong",
    modal: "glass-high light-leak-strong rounded-2xl",
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl",
        variantClasses[variant],
        interactive &&
          "cursor-pointer transition-shadow duration-200 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)]",
        className
      )}
      whileHover={
        interactive ? { scale: 1.02, transition: springPresets.snappy } : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
