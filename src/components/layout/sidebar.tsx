"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Inbox,
  Sun,
  Calendar,
  Archive,
  Clock,
  BarChart2,
  Settings,
  Plus,
  Zap,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springPresets } from "@/lib/motion";
import { useProjects } from "@/hooks/use-projects";
import { useUIStore } from "@/stores/ui-store";
import { signOut } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/today", label: "Today", icon: Sun },
  { href: "/upcoming", label: "Upcoming", icon: Calendar },
  { href: "/anytime", label: "Anytime", icon: Archive },
  { href: "/someday", label: "Someday", icon: Clock },
];

const TOOLS = [
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/focus", label: "Focus", icon: Zap },
  { href: "/insights", label: "Insights", icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: projects } = useProjects();
  const { setIsCreateProjectOpen } = useUIStore();

  return (
    <aside className="flex flex-col w-60 h-screen bg-[--surface-container-low] border-r border-white/5 shrink-0">
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm font-[family-name:var(--font-manrope)]">
              R
            </span>
          </div>
          <span className="font-bold text-[--on-surface] text-base font-[family-name:var(--font-manrope)]">
            Roni
          </span>
        </div>
        <p className="label-sm text-[--on-surface-variant] pl-9">
          PRODUCTIVITY MODE
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 pb-2">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathname === item.href}
            />
          ))}
        </div>

        <div className="mt-5 mb-1 px-2">
          <p className="label-sm text-[--on-surface-variant]">Tools</p>
        </div>
        <div className="space-y-0.5">
          {TOOLS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathname === item.href}
            />
          ))}
        </div>

        <div className="mt-5 mb-1 px-2 flex items-center justify-between">
          <p className="label-sm text-[--on-surface-variant]">Projects</p>
          <button
            onClick={() => setIsCreateProjectOpen(true)}
            className="w-5 h-5 rounded flex items-center justify-center text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-0.5">
          {projects?.map((project) => (
            <NavItem
              key={project.id}
              href={`/projects/${project.id}`}
              label={project.name}
              active={pathname === `/projects/${project.id}`}
              dotColor={project.color}
            />
          ))}
          {(!projects || projects.length === 0) && (
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[--on-surface-variant] hover:text-[--on-surface] text-sm hover:bg-white/5 transition-colors font-[family-name:var(--font-inter)]"
            >
              <FolderOpen className="w-4 h-4 opacity-50" />
              <span className="text-xs">New Project</span>
            </button>
          )}
        </div>
      </nav>

      <div className="px-2 pb-4 border-t border-white/5 pt-3 space-y-0.5">
        <NavItem
          href="/settings"
          label="Settings"
          icon={Settings}
          active={pathname === "/settings"}
        />
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[--on-surface-variant] hover:text-[--error] text-sm hover:bg-red-500/5 transition-colors font-[family-name:var(--font-inter)]"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  active: boolean;
  dotColor?: string;
}

function NavItem({ href, label, icon: Icon, active, dotColor }: NavItemProps) {
  return (
    <Link href={href} className="relative flex items-center group">
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-xl bg-[--secondary-container]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springPresets.bounce}
          />
        )}
      </AnimatePresence>
      <span
        className={cn(
          "relative z-10 flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm transition-colors font-[family-name:var(--font-inter)]",
          active
            ? "text-white font-medium"
            : "text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5"
        )}
      >
        {Icon ? (
          <Icon className="w-4 h-4 shrink-0" />
        ) : dotColor ? (
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: dotColor }}
          />
        ) : (
          <span className="w-4 h-4" />
        )}
        {label}
      </span>
    </Link>
  );
}
