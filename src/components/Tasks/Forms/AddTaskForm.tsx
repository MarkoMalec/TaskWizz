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
      assignedTo: [],
    },
  });

  const { reset } = form;
  const { isMutating, doFetch } = useMutatingFetch(reset);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userId = user.id;
    const extendedValues = {
      ...values,
      createdById: userId,
    };
    console.log(values);
    doFetch(
      "/api/task/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(extendedValues),
      },
      () => {
        toast.success(`Task ${values.name} created`);
      },
    );
  };

  return (
    <div>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <TaskFormInput
            control={form.control}
            name="name"
            label="Task Name"
            type="text"
            placeholder="Task Name"
          />
          <TaskFormInput
            control={form.control}
            name="priority"
            label="Priority"
            type="select"
            placeholder="Select priority..."
            options={["Low", "Normal", "High"]}
          />
          <TaskFormInput
            control={form.control}
            name="description"
            label="Description"
            type="textarea"
            placeholder="Description"
          />
          <DatePicker control={form.control} label="Deadline" name="deadline" />
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
