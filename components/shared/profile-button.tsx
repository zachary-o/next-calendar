import { LogIn, User } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

interface Props {
  onClickSignIn?: () => void
  className?: string
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession()

  return (
    <div className={className}>
      {!session ? (
        <Button size="icon" variant="secondary" onClick={onClickSignIn}>
          <LogIn size={20} />
        </Button>
      ) : (
        <Link href="/profile">
          <Button size="icon" variant="secondary">
            <User />
          </Button>
        </Link>
      )}
    </div>
  )
}
