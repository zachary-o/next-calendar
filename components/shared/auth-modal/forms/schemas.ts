import { z } from "zod"

export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })

export const formSignInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: passwordSchema
})

export const formSignUpSchema = formSignInSchema.merge(
  z.object({
    fullName: z.string().min(2, { message: "Enter your full name" }),
    condirmPassword: passwordSchema
  })
).refine(data => data.password === data.condirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type TFormSignInValues = z.infer<typeof formSignInSchema>
export type TFormSignUpValues = z.infer<typeof formSignUpSchema>