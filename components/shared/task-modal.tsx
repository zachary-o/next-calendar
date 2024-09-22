"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export const TaskModal: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(id)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[540px] bg-white overflow-hidden"
        )}
      ></DialogContent>
    </Dialog>
  );
};
