import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TaskList } from "@/components/tasks/task-list";
import { MagicButton } from "@/components/tasks/magic-button";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!project) notFound();

  return (
    <>
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: project.color }}
        />
        <h1 className="text-base font-bold text-[--on-surface] font-[family-name:var(--font-manrope)] tracking-tight">
          {project.name}
        </h1>
      </div>
      <TaskList folder="inbox" projectId={id} />
      <MagicButton />
    </>
  );
}
