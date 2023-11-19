"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SingleImageDropzone } from "../ui/SingleImageDropzone";
import { useEdgeStore } from "~/lib/edgestore";

import UserFormInput from "~/components/forms/UserFormInput";

import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";

import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Form,
} from "~/components/ui/form";
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
  image: z.string().optional(),
  profile: z.object({
    // function: z.string(),
    profession: z.string(),
    hasTransport: z.boolean(),
  }),
});

const EditUserForm = ({ userData }: any) => {
  const [tempValue, setTempValue] = useState(null);
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState("");
  const { edgestore } = useEdgeStore();
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
      image: userData.image,
      profile: {
        // function: userProfile.function,
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
        body: JSON.stringify({ ...values, id: userData.id, fileUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {
        toast.success(`User ${values.name} edited`);
      },
    );
  };

  console.log(userData);

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
      {/* ACCOUNT */}
      <TabsContent value="account">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SingleImageDropzone
              width={200}
              height={200}
              value={file ? file : userData.image}
              onChange={(file) => {
                setFile(file);
              }}
            />
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
            <Button
              type="submit"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      // you can use this to show a progress bar
                      console.log(progress);
                    },
                  });
                  // you can run some server action or api here
                  // to add the necessary data to your database
                  console.log(res);
                  setFileUrl(res.url);
                  console.log(fileUrl, 'file URL');
                }
              }}
            >
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
