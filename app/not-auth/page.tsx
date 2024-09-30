import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotAuth() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h4>Access denied</h4>
      <p>This page can be viewed by authenticated users</p>
      <Link href="/">
        <Button className="gap-2">
          <ArrowLeft />
          Go to main
        </Button>
      </Link>
    </div>
  );
}
