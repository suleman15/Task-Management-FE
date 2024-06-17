import { dummyData } from "@/assets/task";
import { columns } from "@/components/custom/table/columns";
import { TasksTable } from "@/components/custom/table/tasks-table";
import { createLazyFileRoute } from "@tanstack/react-router";
import { title } from "process";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-10">
      <h3 className="text-2xl font-bold mb-5">Welcome Task Dashboard!</h3>
      <TasksTable columns={columns} data={dummyData} />
    </div>
  );
}

// task
// title
// status
// priority
// createdAt
