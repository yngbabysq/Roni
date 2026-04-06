import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { TaskDetail } from "@/components/tasks/task-detail";
import { CommandPalette } from "@/components/ui/command-palette";
import { CreateProjectModal } from "@/components/ui/create-project-modal";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[--surface-dim] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto thin-scrollbar">
          {children}
        </main>
      </div>
      <TaskDetail />
      <CommandPalette />
      <CreateProjectModal />
    </div>
  );
}
