import { useState, useEffect } from "react";
import { useTaskQueries, useTaskidQuery } from "@/api/query/task.query";
import { columns } from "@/components/custom/table/columns";
import { TasksTable } from "@/components/custom/table/tasks-table";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const taskId = useTaskidQuery();
  const tasks = useTaskQueries(taskId?.data?.data);

  return (
    <div className="p-10">
      <h3 className="text-2xl font-bold mb-5">Welcome Task Dashboard!</h3>
      <TasksTable
        columns={columns}
        data={tasks.map((task) => task.data?.data).filter((task) => task)}
      />
    </div>
  );
}
