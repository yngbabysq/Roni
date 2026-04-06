"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  isSameDay,
  isToday,
  differenceInMinutes,
  parseISO,
  startOfDay,
  setHours,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar } from "lucide-react";
import { springPresets } from "@/lib/motion";
import { useEvents, useCreateEvent } from "@/hooks/use-events";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAY_START_HOUR = 6;
const VISIBLE_HOURS = 18;
const HOUR_HEIGHT = 64;

function eventTopPercent(startTime: string, dayStart: Date) {
  const start = parseISO(startTime);
  const mins = differenceInMinutes(start, dayStart);
  return (mins / 60) * HOUR_HEIGHT;
}

function eventHeightPx(startTime: string, endTime: string) {
  const mins = differenceInMinutes(parseISO(endTime), parseISO(startTime));
  return Math.max((mins / 60) * HOUR_HEIGHT, 28);
}

const EVENT_COLORS = [
  { bg: "bg-[--electric-indigo]/20", border: "border-[--electric-indigo]/40", text: "text-[--primary]" },
  { bg: "bg-[--vibrant-violet]/20", border: "border-[--vibrant-violet]/40", text: "text-violet-300" },
  { bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-300" },
  { bg: "bg-rose-500/20", border: "border-rose-500/40", text: "text-rose-300" },
  { bg: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-300" },
];

function getEventColor(color: string) {
  const map: Record<string, typeof EVENT_COLORS[0]> = {
    indigo: EVENT_COLORS[0],
    violet: EVENT_COLORS[1],
    emerald: EVENT_COLORS[2],
    rose: EVENT_COLORS[3],
    amber: EVENT_COLORS[4],
  };
  return map[color] ?? EVENT_COLORS[0];
}

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const { data: events = [] } = useEvents(
    format(weekStart, "yyyy-MM-dd"),
    format(weekEnd, "yyyy-MM-dd")
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (DAY_START_HOUR - 1) * HOUR_HEIGHT;
    }
  }, []);

  const nowTopPx =
    (differenceInMinutes(now, startOfDay(now)) / 60) * HOUR_HEIGHT;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <motion.button
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={springPresets.snappy}
              className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-[--on-surface-variant] hover:text-[--on-surface] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={springPresets.snappy}
              className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-[--on-surface-variant] hover:text-[--on-surface] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <motion.button
            onClick={() => setCurrentWeek(new Date())}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={springPresets.snappy}
            className="px-3 py-1.5 rounded-lg glass border border-white/8 label-sm text-[--on-surface-variant] hover:text-[--on-surface] transition-colors cursor-pointer"
          >
            Today
          </motion.button>

          <h2 className="text-sm font-semibold text-[--on-surface] font-[family-name:var(--font-manrope)]">
            {format(weekStart, "MMM d")} – {format(weekEnd, "MMM d, yyyy")}
          </h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={springPresets.snappy}
          className="flex items-center gap-2 px-3 py-2 rounded-xl gradient-primary text-white text-sm font-medium cursor-pointer"
          style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}
        >
          <Plus className="w-4 h-4" />
          New Event
        </motion.button>
      </div>

      {/* Day headers */}
      <div className="flex shrink-0 border-b border-white/5">
        <div className="w-16 shrink-0" />
        {weekDays.map((day) => {
          const today = isToday(day);
          return (
            <div
              key={day.toISOString()}
              className="flex-1 flex flex-col items-center py-3 gap-1"
            >
              <span className="label-sm text-[--on-surface-variant]">
                {format(day, "EEE")}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-[family-name:var(--font-manrope)] transition-colors ${
                  today
                    ? "gradient-primary text-white"
                    : "text-[--on-surface]"
                }`}
                style={
                  today
                    ? { boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }
                    : {}
                }
              >
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto thin-scrollbar">
        <div className="flex" style={{ minHeight: `${24 * HOUR_HEIGHT}px` }}>
          {/* Time labels */}
          <div className="w-16 shrink-0 relative">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="absolute left-0 right-0 flex items-start justify-end pr-3"
                style={{ top: `${hour * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}
              >
                {hour > 0 && (
                  <span className="label-sm text-[--on-surface-variant] -translate-y-2">
                    {format(setHours(new Date(), hour), "ha")}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => {
            const dayStart = startOfDay(day);
            const dayEvents = events.filter(
              (e) => !e.is_all_day && isSameDay(parseISO(e.start_time), day)
            );
            const todayColumn = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className="flex-1 relative border-l border-white/5"
              >
                {/* Hour lines */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="absolute left-0 right-0 border-t border-white/4"
                    style={{ top: `${hour * HOUR_HEIGHT}px` }}
                  />
                ))}

                {/* Half-hour lines */}
                {HOURS.map((hour) => (
                  <div
                    key={`h-${hour}`}
                    className="absolute left-0 right-0 border-t border-white/[0.02]"
                    style={{ top: `${hour * HOUR_HEIGHT + HOUR_HEIGHT / 2}px` }}
                  />
                ))}

                {/* Current time indicator */}
                {todayColumn && (
                  <div
                    className="absolute left-0 right-0 z-20 flex items-center"
                    style={{ top: `${nowTopPx}px` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[--primary] -translate-x-1 shrink-0" />
                    <div className="flex-1 h-px bg-[--primary]" />
                  </div>
                )}

                {/* Events */}
                <AnimatePresence>
                  {dayEvents.map((event) => {
                    const top = eventTopPercent(event.start_time, dayStart);
                    const height = eventHeightPx(event.start_time, event.end_time);
                    const colors = getEventColor(event.color);

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={springPresets.fluidExpand}
                        whileHover={{ scale: 1.02, zIndex: 30 }}
                        className={`absolute left-1 right-1 rounded-lg border px-2 py-1 cursor-pointer z-10 ${colors.bg} ${colors.border}`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        <p className={`text-xs font-semibold truncate font-[family-name:var(--font-manrope)] ${colors.text}`}>
                          {event.title}
                        </p>
                        {height > 40 && (
                          <p className="text-xs text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
                            {format(parseISO(event.start_time), "h:mm")}–
                            {format(parseISO(event.end_time), "h:mma")}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center opacity-30">
            <Calendar className="w-10 h-10 text-[--on-surface-variant] mx-auto mb-3" />
            <p className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
              No events this week
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
