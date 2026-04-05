import { createClient } from "@/lib/supabase/server";
import { BarChart2, Zap, CheckSquare, TrendingUp } from "lucide-react";

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [{ count: completedThisWeek }, { data: sessions }] = await Promise.all([
    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user!.id)
      .eq("is_completed", true)
      .gte("completed_at", weekAgo.toISOString()),
    supabase
      .from("focus_sessions")
      .select("duration_minutes, type")
      .eq("user_id", user!.id)
      .gte("started_at", weekAgo.toISOString()),
  ]);

  const totalFocusMinutes = sessions?.reduce((sum, s) => {
    return s.type === "work" ? sum + s.duration_minutes : sum;
  }, 0) ?? 0;

  const focusHours = (totalFocusMinutes / 60).toFixed(1);
  const sessionCount = sessions?.filter(s => s.type === "work").length ?? 0;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-[--on-surface] font-[family-name:var(--font-manrope)] tracking-tight mb-1">
          Flow Insights
        </h2>
        <p className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
          Your productivity, visualized — last 7 days
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard
          icon={Zap}
          label="Focus Hours"
          value={focusHours}
          unit="hrs"
          color="var(--electric-indigo)"
        />
        <MetricCard
          icon={CheckSquare}
          label="Tasks Done"
          value={String(completedThisWeek ?? 0)}
          unit="this week"
          color="var(--success)"
        />
        <MetricCard
          icon={BarChart2}
          label="Sessions"
          value={String(sessionCount)}
          unit="pomodoros"
          color="var(--vibrant-violet)"
        />
      </div>

      <div className="glass light-leak rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-[--primary]" />
          <h3 className="text-sm font-semibold text-[--on-surface] font-[family-name:var(--font-manrope)]">
            Recommendations
          </h3>
        </div>
        <div className="space-y-3">
          {sessionCount === 0 ? (
            <RecommendationCard
              emoji="🎯"
              text="Start your first focus session to unlock insights."
            />
          ) : (
            <>
              <RecommendationCard
                emoji="⚡"
                text={`Great work! You've completed ${sessionCount} focus sessions this week.`}
              />
              {Number(focusHours) > 0 && (
                <RecommendationCard
                  emoji="🔥"
                  text={`${focusHours} hours of deep work. Flow state is building.`}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon, label, value, unit, color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="glass light-leak rounded-2xl p-5">
      <Icon className="w-4 h-4 mb-4" style={{ color }} />
      <p className="text-3xl font-extrabold text-[--on-surface] font-[family-name:var(--font-manrope)] tracking-tight mb-1">
        {value}
      </p>
      <p className="text-xs text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
        {unit}
      </p>
      <p className="label-sm text-[--on-surface-variant] mt-2">{label}</p>
    </div>
  );
}

function RecommendationCard({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/4">
      <span className="text-lg">{emoji}</span>
      <p className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
        {text}
      </p>
    </div>
  );
}
