import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { taskSchema } from "@/schemas/task.schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "@/assets/data";
import { UpdateTaskSheet } from "./update-task-sheet";
import React from "react";
import { DeleteTasksDialog } from "./delete-task-dialog";
import { useUpdateTasks } from "@/api/mutation/task.mutation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const [showUpdateTaskSheet, setShowUpdateTaskSheet] = React.useState(false);
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);
  const updateTasks = useUpdateTasks();

  return (
    <DropdownMenu>
      <UpdateTaskSheet
        open={showUpdateTaskSheet}
        onOpenChange={setShowUpdateTaskSheet}
        task={row.original}
      />
      {/*
       */}
      <DeleteTasksDialog
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        tasks={[row.original?._id]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={task.label}
              onValueChange={(value) => {
                updateTasks.mutate({
                  ids: [row.original._id],
                  updateData: { label: value },
                });
              }}
            >
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
