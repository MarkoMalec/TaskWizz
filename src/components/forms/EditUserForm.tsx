"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import UserFormInput from "~/components/forms/UserFormInput";

import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";

import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Form } from "~/components/ui/form";
import { Loader2 } from "lucide-react";
import UserAccountForm from "./UserAccountForm";

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
  profile: z.object({
    profession: z.string(),
    hasTransport: z.boolean(),
  }),
});

const EditUserForm = ({ userData }: any) => {
  const { isMutating, doFetch } = useMutatingFetch();

  const userProfile = userData.profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      profile: {
        profession: userProfile.profession,
        hasTransport: userProfile.hasTransport,
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    doFetch(
      "/api/user/edit",
      {
        method: "PATCH",
        body: JSON.stringify({ ...values, id: userData.id }),
      },
      () => {
        toast.success(`User ${values.name} updated!`);
      },
    );
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-10 w-full">
        <TabsTrigger className="w-full" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger className="w-full" value="profile">
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <UserAccountForm userData={userData} />
      </TabsContent>
      {/* PROFILE */}
      <TabsContent value="profile">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <UserFormInput
              control={form.control}
              name="profile.profession"
              type="text"
              label="Profession"
              placeholder="Profession"
            />
            <UserFormInput
              control={form.control}
              name="profile.hasTransport"
              type="switch"
              label="Does user have transport?"
              placeholder="transport"
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
      </TabsContent>
    </Tabs>
  );
};

export default EditUserForm;
