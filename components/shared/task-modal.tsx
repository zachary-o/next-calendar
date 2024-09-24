"use client"

import { cn } from "@/lib/utils"
import { newTaskSchema } from "@/schemas/new-task-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { FormInput } from "./form-input"

interface Props {
  id: string
  onClose: () => void
}

export const TaskModal: React.FC<Props> = ({ id, onClose }) => {
  const chosenDate = id
    .split("-")
    .reverse()
    .map((part, index) => {
      if (index === 0 && Number(part) < 10) {
        return `0${part}`;
      } else if (index === 1 && part.length < 2) {
        return `0${part}`;
      }
      return part
    })
    .join(".");
  
  const form = useForm({
    resolver: zodResolver(newTaskSchema),
    defaultValues: { 
      name: "", 
      description: "", 
      taskDate: id && id !== "null-null-null" ? chosenDate : "" 
    },
  })

  const onSubmit = () => {}

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
            <FormInput className="mb-10" name="description" label="Decription" />
            <FormInput name="taskDate" label="Date and time in format [DD.MM.YYYY, HH:mm]" required/>
            <div className="flex flex-col">
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
  )
}
