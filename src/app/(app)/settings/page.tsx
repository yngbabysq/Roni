import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { User, Moon, Shield, LogOut } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-[--on-surface] font-[family-name:var(--font-manrope)] tracking-tight mb-1">
          Settings
        </h2>
        <p className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-4">
        <SettingsSection icon={User} title="Profile">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-manrope)]">
              {profile?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="text-sm font-medium text-[--on-surface] font-[family-name:var(--font-inter)]">
                {profile?.full_name || "Anonymous"}
              </p>
              <p className="text-xs text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
                {user?.email}
              </p>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Moon} title="Appearance">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[--on-surface] font-[family-name:var(--font-inter)]">Theme</p>
              <p className="text-xs text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
                Dark — only option in this version
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-[--surface-container-highest] border border-white/10">
              <span className="label-sm text-[--primary]">DARK</span>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Shield} title="Privacy & Security">
          <p className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
            Password change and account deletion coming soon.
          </p>
        </SettingsSection>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
        <span className="label-sm text-[--on-surface-variant]">
          Roni Infinite v1.0.0 Beta
        </span>
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[--error] text-sm font-medium hover:bg-red-500/5 transition-colors font-[family-name:var(--font-inter)]"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass light-leak rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-[--primary]" />
        <h3 className="text-sm font-semibold text-[--on-surface] font-[family-name:var(--font-manrope)]">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
