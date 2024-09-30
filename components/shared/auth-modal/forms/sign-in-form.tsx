import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { formSignInSchema, TFormSignInValues } from "./schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "../../form-input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { signIn } from "next-auth/react"

interface Props {
  onClose?: VoidFunction
  className?: string
}

export const SignInForm: React.FC<Props> = ({ onClose, className }) => {
  const form = useForm<TFormSignInValues>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: TFormSignInValues) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      })

      if (!response?.ok) {
        throw Error()
      }
      toast({
        title: "Log In",
        description: "Successfully signed in ✅"
      })
      onClose?.()
    } catch (error) {
      console.log("error [LOGIN]", error)
      toast({
        title: "Failed to log in ❌",
        description: `${error}`,
        variant: "destructive",
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mt-2">
          <h4 className="text-bold text-sm">Account Log In</h4>
          <p>Enter your email to sign in</p>
        </div>

        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button
          className="h-12 text-base"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </FormProvider>
  )
}
