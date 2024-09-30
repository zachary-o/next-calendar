import { toast } from "@/hooks/use-toast";
import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getUserSession();
  console.log("session", session);

  if (!session) {
    return redirect("/not-auth");
  }

  return <div>PROFILE</div>;
}
