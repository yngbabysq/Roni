import { TaskList } from "@/components/tasks/task-list";
import { MagicButton } from "@/components/tasks/magic-button";

export default function Page() {
  return (
    <>
      <TaskList folder="anytime" />
      <MagicButton />
    </>
  );
}
