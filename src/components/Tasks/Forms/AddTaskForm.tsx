"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import TaskFormInput, { SelectUsers } from "./TaskFormInput";
import { DatePicker } from "./TaskFormInput";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Task from "../Task";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Task name must be at least 2 characters long.",
  }),
  priority: z.string(),
  description: z.string().optional(),
  deadline: z.date({
    required_error: "A task must have a deadline.",
  }),
  address: z.string().min(5, {
    message: "Invalid address.",
  }),
  postcode: z.string().regex(/^\d{4}[A-Za-z]{2}$/, {
    message: "Please enter a valid post code (e.g., 1234AB)",
  }),
  city: z.string().min(1, {
    message: "City must be filled in.",
  }),
  assignedTo: z.array(z.string()).min(1, "At least one user must be assigned."),
  file: z.any().refine((file) => file.length !== 0, "File is required"),
});

const AddTaskForm = ({ user }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      priority: "Normal",
      description: "",
      deadline: new Date(),
      address: "",
      postcode: "",
      city: "",
      file: null,
      assignedTo: [],
    },
  });

  const { reset } = form;
  const { isMutating, doFetch } = useMutatingFetch(reset);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // doFetch("/api/task/email", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    const userId = user.id;
    const extendedValues = {
      ...values,
      fileName: `${values.file.name}`,
      createdById: userId,
    };

    try {
      await doFetch(
        "/api/task/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "file-name": values.file.name,
          },
          body: JSON.stringify(extendedValues),
        },
        () => {
          toast.success(`Task ${values.name} created`);
        },
      );

      await doFetch("/api/task/upload", {
        method: "POST",
        body: values.file,
        headers: {
          "x-file-name": values.file.name,
        },
      });
    } catch (error) {
      toast.error("An error occurred while creating the task.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <TaskFormInput
            control={form.control}
            name="name"
            label="Task Name"
            type="text"
            placeholder="Task Name"
          />
          <div className="flex gap-3 items-end">
            <TaskFormInput
              control={form.control}
              name="priority"
              label="Priority"
              type="select"
              placeholder="Select priority..."
              options={["Low", "Normal", "High"]}
              className="w-full max-w-[150px]"
            />
            <DatePicker
              control={form.control}
              label="Deadline"
              name="deadline"
            />
          </div>
          <TaskFormInput
            control={form.control}
            name="description"
            label="Description"
            type="textarea"
            placeholder="Description"
          />
          <Separator />
          <h3 className="text-xl font-extrabold">Location</h3>
          <div className="flex max-w-[400px] gap-3">
            <TaskFormInput
              control={form.control}
              name="address"
              label="Address"
              type="text"
              placeholder="Streetname + House nr."
              className="mb-2 flex-1"
            />
            <TaskFormInput
              control={form.control}
              name="postcode"
              label="Post code"
              type="text"
              placeholder="1234AB"
              className="max-w-[90px] flex-1"
            />
          </div>
          <TaskFormInput
            control={form.control}
            name="city"
            label="City"
            type="text"
            placeholder="City"
            className="max-w-[400px] flex-1"
          />
          <TaskFormInput
            control={form.control}
            name="file"
            label="Attach file"
            type="file"
            placeholder="Attach file"
            // onChange={(e) => form.setValue("file", e.target.files[0])} // set the file object directly
          />
          <SelectUsers
            name="assignedTo"
            control={form.control}
            label="Assign users"
          />
          <Button type="submit">
            {isMutating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Task"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTaskForm;
