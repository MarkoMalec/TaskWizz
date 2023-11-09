import React, { useEffect } from "react";
import { User } from "~/lib/types";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { Control } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { format } from "date-fns";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";

type TaskFormInputProps = {
  control: Control<any>;
  name: string;
  type: "text" | "email" | "password" | "textarea" | "switch" | "select";
  label: string;
  placeholder: string;
  options?: string[];
  className?: string;
};

const TaskFormInput: React.FC<TaskFormInputProps> = ({
  control,
  name,
  type,
  label,
  placeholder,
  options,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            type === "switch"
              ? "flex items-center gap-5"
              : className
              ? className
              : ""
          }
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "switch" ? (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            ) : type === "select" ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="max-w-[180px]">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskFormInput;

type SelectUsersInputProps = {
  control: Control<any>;
  name: string;
  label: string;
};

export function SelectUsers({ control, name, label }: SelectUsersInputProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([]);
  const [users, setUsers] = React.useState<User[]>([]);

  const { isMutating, doFetch } = useMutatingFetch();

  useEffect(() => {
    doFetch(
      "/api/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        setUsers(data);
      },
    );
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="text-wrap flex w-[fit-content] justify-between"
              >
                {field.value.length > 0
                  ? field.value
                      .map(
                        (id: string) =>
                          users.find((user) => user.id === id)?.name,
                      )
                      .join(" | ")
                  : "Select users..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={() => {
                        field.value.includes(user.id)
                          ? field.onChange(
                              field.value.filter(
                                (id: string) => id !== user.id,
                              ),
                            )
                          : field.onChange([...field.value, user.id]);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value.includes(user.id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {user.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}

export function DatePicker({ control, name, label }: any) {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : <span>Set a deadline date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
