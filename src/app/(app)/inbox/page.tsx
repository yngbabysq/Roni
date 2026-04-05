import { TaskList } from "@/components/tasks/task-list";
import { MagicButton } from "@/components/tasks/magic-button";

export default function InboxPage() {
  return (
    <>
      <TaskList folder="inbox" />
      <MagicButton />
    </>
  );
}
