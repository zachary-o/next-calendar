"use client";

import { toast } from "@/hooks/use-toast";
import { convertDateFormat } from "@/lib/convert-date-format";
import { createNewTask } from "@/lib/create-new-task";
import { deleteTaskById } from "@/lib/delete-task-by-id";
import { updateTask } from "@/lib/update-task";
import { cn } from "@/lib/utils";
import { newTaskSchema, TFormNewTaskValues } from "@/schemas/new-task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { FormInput } from "./form-input";

interface Props {
  selectedYear: string | null;
  selectedMonth: string | null;
  selectedDay: string | null;
  selectedTaskById: Task | undefined;
  daysInMonth: number;
  firstDayOfMonth: number;
  handleCloseModal: () => void;
  onClose: () => void;
  fetchAllTasks: () => void;
}

export const TaskModal: React.FC<Props> = ({
  selectedYear,
  selectedMonth,
  selectedDay,
  selectedTaskById,
  daysInMonth,
  firstDayOfMonth,
  handleCloseModal,
  onClose,
  fetchAllTasks,
}) => {
  const id = `${selectedDay}.${selectedMonth}.${selectedYear}`;
  const chosenDate = convertDateFormat(id);

  const form = useForm({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      taskDate: id && id !== "null.null.null" ? chosenDate : "",
    },
  });

  useEffect(() => {
    if (selectedTaskById) {
      form.reset({
        name: selectedTaskById.name || "",
        description: selectedTaskById.description || "",
        taskDate: selectedTaskById.taskDate || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
        taskDate: id && id !== "null.null.null" ? chosenDate : "",
      });
    }
  }, [selectedTaskById, id, chosenDate, form]);

  const handleDeleteTask = async (id: number): Promise<void> => {
    try {
      await deleteTaskById(id);
      toast({
        title: "Task deletion",
        description: "Task successfully deleted",
      });
      handleCloseModal();
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
      toast({
        title: "Task deletion",
        description: "Failed to delete a task",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async <T extends TFormNewTaskValues>(
    data: T
  ): Promise<void> => {
    try {
      if (!selectedTaskById) {
        await createNewTask({
          name: data.name,
          description: data.description,
          taskDate: data.taskDate,
        });

        toast({
          title: "Task created",
          description: "You successfully added a new task",
        });
      } else {
        await updateTask(
          {
            name: data ? data.name : selectedTaskById.name,
            description: data ? data.description : selectedTaskById.description,
            taskDate: data ? data.taskDate : selectedTaskById.taskDate,
          },
          selectedTaskById.id
        );

        toast({
          title: "Task updated",
          description: "You successfully updated a task",
        });
      }

      handleCloseModal();
      fetchAllTasks();
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Failed to add a new task",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={Boolean(id)} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-10 w-[800px] max-w-[800px] min-h-[540px] overflow-hidden",
          "bg-white dark:bg-gray-600"
        )}
      >
        <DialogTitle className="text-black dark:text-white">
          Add new task
        </DialogTitle>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput className="mb-10" name="name" label="Name" required />
            <FormInput
              className="mb-10"
              name="description"
              label="Decription"
            />
            <FormInput
              name="taskDate"
              label="Date and time in format DD.MM.YYYY"
              date
              required
              daysInMonth={daysInMonth}
              firstDayOfMonth={firstDayOfMonth}
            />
            <div className="flex flex-row justify-end gap-4">
              {selectedTaskById && (
                <Button
                  className="text-base mt-10 self-end"
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    handleDeleteTask(selectedTaskById.id);
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                className="text-base mt-10 self-end"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
