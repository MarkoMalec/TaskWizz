"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import UserFormInput from "./UserFormInput";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters",
  }),
  profession: z.string().min(1, {
    message: "Please fill in this field.",
  }),
  hasTransport: z.boolean().default(false).optional(),
});

export default function AddUserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      profession: "",
      hasTransport: false,
    },
  });

  const { reset } = form;
  const { isMutating, doFetch } = useMutatingFetch(reset);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    doFetch(
      "/api/user/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
      () => {
        toast.success(`User ${values.name} created`);
      },
    );
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <UserFormInput
          control={form.control}
          name="name"
          label="Username"
          type="text"
          placeholder="Name"
        />
        <UserFormInput
          control={form.control}
          name="email"
          type="email"
          label="E-mail"
          placeholder="E-mail"
        />
        <UserFormInput
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
        />
        <UserFormInput
          control={form.control}
          name="profession"
          label="Profession"
          type="text"
          placeholder="Profession"
        />
        <UserFormInput
          control={form.control}
          name="hasTransport"
          type="switch"
          label="Does user have transport?"
          placeholder="transport"
        />
        <Button type="submit">
          {isMutating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create user"
          )}
        </Button>
      </form>
    </Form>
  );
}
