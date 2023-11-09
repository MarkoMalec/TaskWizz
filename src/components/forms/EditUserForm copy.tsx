"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";

import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Edit } from "lucide-react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  email: z.string().min(2, {
    message: "email not correct",
  }),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters.",
  }),
  profile: z.object({
    // function: z.string(),
    profession: z.string(),
    hasTransport: z.boolean(),
  }),
});

const EditUserForm = ({ userData }: any) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [tempValue, setTempValue] = useState(null);
  const { isMutating, doFetch } = useMutatingFetch();

  if (!userData) {
    return <div>Loading</div>;
  }

  const userProfile = userData.profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      profile: {
        // function: userProfile.function,
        profession: userProfile.profession,
        hasTransport: userProfile.hasTransport,
      },
    },
  });

  const onFieldEdit = (fieldName: string) => {
    setIsEditing({ ...isEditing, [fieldName]: !isEditing[fieldName] });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    doFetch(
      "/api/user/edit",
      {
        method: "PATCH",
        body: JSON.stringify({ ...values, id: userData.id }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {
        toast.success(`User ${values.name} edited`);
      },
    );
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full mb-10">
        <TabsTrigger className="w-full" value="account">Account</TabsTrigger>
        <TabsTrigger className="w-full" value="profile">Profile</TabsTrigger>
      </TabsList>
      {/* ACCOUNT */}
      <TabsContent value="account">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel>Name</FormLabel>
                  <FormLabel hidden={isEditing["name"] ? true : false}>
                    {userData.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={!isEditing["name"] ? "hidden" : ""}
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <button
                    className="my-[0!important]"
                    type="button"
                    onClick={() => onFieldEdit("name")}
                  >
                    <Edit className="w-5" />
                  </button>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel>E-mail</FormLabel>
                  <FormLabel hidden={isEditing["email"] ? true : false}>
                    {userData.email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={!isEditing["email"] ? "hidden" : ""}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <button
                    className="my-[0!important]"
                    type="button"
                    onClick={() => onFieldEdit("email")}
                  >
                    <Edit className="w-5" />
                  </button>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel>Password</FormLabel>
                  <FormLabel hidden={isEditing["password"] ? true : false}>*******</FormLabel>
                  <FormControl>
                    <Input className={!isEditing["password"] ? "hidden" : ""} type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <button
                    className="my-[0!important]"
                    type="button"
                    onClick={() => onFieldEdit("password")}
                  >
                    <Edit className="w-5" />
                  </button>
                  <FormMessage />
                </FormItem>
              )}
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
      {/* PROFILE */}
      <TabsContent value="profile">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profile.profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Profession" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.hasTransport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Does user have transport?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
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
