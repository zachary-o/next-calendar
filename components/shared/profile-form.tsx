"use client";

import { toast } from "@/hooks/use-toast";
import { updateUserInfo } from "@/lib/update-user-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  formSignUpSchema,
  TFormSignUpValues,
} from "./auth-modal/forms/schemas";
import { Container } from "./container";
import { FormInput } from "./form-input";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormSignUpValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast({
        title: "Info has been updated",
      });
    } catch (error) {
      return toast({
        title: "Failed to updated the info",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <h4>Personal information</h4>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="Email" required />
          <FormInput name="fullName" label="Full name" required />
          <FormInput
            name="password"
            label="New password"
            type="password"
            required
          />
          <FormInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            required
          />

          <Button
            className="text-base mt-10"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>
          <Button
            className="text-base"
            variant="secondary"
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={onClickSignOut}
          >
            Sign out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
