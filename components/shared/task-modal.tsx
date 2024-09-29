"use client";

import { convertDateFormat } from "@/lib/convert-date-format";
import { deleteTaskById } from "@/lib/delete-task-by-id";
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
  handleCloseModal: () => void;
  onClose: () => void;
  fetchAllTasks: () => void;
}

export const TaskModal: React.FC<Props> = ({
  selectedYear,
  selectedMonth,
  selectedDay,
  selectedTaskById,
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

  console.log("selectedTaskById", selectedTaskById);

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTaskById(id);
      handleCloseModal();
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const onSubmit = async (data: TFormNewTaskValues) => {
    try {
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
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
        <DialogTitle className="text-black">Add new task</DialogTitle>
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
              required
            />
            <div className="flex flex-row justify-end gap-4">
              {selectedTaskById && (
                <Button
                  className="text-base mt-10 self-end"
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
