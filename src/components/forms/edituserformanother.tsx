"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";

import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Switch } from "../ui/switch";
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

const profileSchema = z.object({
  id: z.string(),
  function: z.string(),
  profession: z.string(),
  hasTransport: z.boolean(),
  userId: z.string(),
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  email: z.string().min(2, {
    message: "email not correct",
  }),
  profile: profileSchema,
});

type SchemaType = "string" | "boolean" | "unknown";

const getZodFieldType = (field: z.ZodTypeAny): SchemaType => {
  if (field instanceof z.ZodString) {
    return "string";
  } else if (field instanceof z.ZodBoolean) {
    return "boolean";
  }
  return "unknown";
};

const EditUseForm = ({ userData }: any) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const { isMutating, doFetch } = useMutatingFetch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...userData, profile: userData.profile },
  });

  const onFieldEdit = (fieldName: string) => {
    setIsEditing({ ...isEditing, [fieldName]: !isEditing[fieldName] });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    doFetch(
      "/api/user",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(formSchema.shape).map((fieldKey, index) => {
          // RENDER PROFILE FROM USER OBJECT
          if (fieldKey === "profile") {
            return Object.keys(formSchema.shape.profile.shape).map(
              (profileFieldKey, profileIndex) => {

                const fieldType = getZodFieldType(
                  formSchema.shape.profile.shape[
                    profileFieldKey as keyof typeof formSchema.shape.profile.shape
                  ],
                );

                return (
                  <FormField
                    key={profileIndex}
                    control={form.control}
                    name={`profile.${profileFieldKey}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-5">
                       
                        <FormLabel
                          hidden={isEditing[profileFieldKey] ? true : fieldType === 'boolean' ? false : false}
                        >
                          {userData.profile[profileFieldKey]}
                        </FormLabel>
                        <FormControl>
                          {fieldType === "boolean" ? (
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-[0px!important]"
                            />
                          ) : (
                            <Input
                              className={
                                !isEditing[profileFieldKey] ? "hidden" : ""
                              }
                              placeholder={profileFieldKey}
                              {...field}
                            />
                          )}
                        </FormControl>
                        <button
                          className="my-[0!important]"
                          type="button"
                          onClick={() => onFieldEdit(profileFieldKey)}
                        >
                          <Edit className="w-5" />
                        </button>
                      </FormItem>
                    )}
                  />
                );
              },
            );
          }
          // ------------ END PROFILE RENDER --------------
          const theField = fieldKey === "name" ? "name" : "email";
          return (
            <FormField
              key={index}
              control={form.control}
              name={theField}
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel hidden={isEditing[fieldKey] ? true : false}>
                    {userData[fieldKey]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={!isEditing[fieldKey] ? "hidden" : ""}
                      placeholder={fieldKey}
                      {...field}
                    />
                  </FormControl>
                  <button
                    className="my-[0!important]"
                    type="button"
                    onClick={() => onFieldEdit(fieldKey)}
                  >
                    <Edit className="w-5" />
                  </button>
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit">
          {isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default EditUseForm;
