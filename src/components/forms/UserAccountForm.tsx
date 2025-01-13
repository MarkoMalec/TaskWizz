"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import UserFormInput from "./UserFormInput";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters long.",
    }),
    email: z.string().min(2, {
      message: "This email is not valid",
    }),
    password: z.string().min(8, {
      message: "Password must contain at least 8 characters.",
    }),
    image: z.string().optional(),
  });

const UserAccountForm = ({ userData }: any) => {
    const { isMutating, doFetch } = useMutatingFetch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          image: userData.image,
        },
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        doFetch(
          "/api/user/edit",
          {
            method: "PATCH",
            body: JSON.stringify({ ...values, id: userData.id })
          },
          () => {
            toast.success(`User ${values.name} updated!`);
          },
        );
      };

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <UserFormInput
              control={form.control}
              name="name"
              type="text"
              label="Name"
              placeholder="Username"
            />
            <UserFormInput
              control={form.control}
              name="email"
              type="email"
              label="E-mail"
              placeholder="Email"
            />
            <UserFormInput
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Button type="submit">
              {isMutating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
    );
};

export default UserAccountForm;