import React, { useEffect } from "react";
import { User } from "~/lib/types";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { useTranslations } from "next-intl";
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

import { Check, ChevronsUpDown, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Badge } from "~/components/ui/badge";

type TaskFormInputProps = {
  control: Control<any>;
  name: string;
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "switch"
    | "select"
    | "file";
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
  const translateLabel = useTranslations("TaskForm.labels");
  const placeholderTranslation = useTranslations("TaskForm.placeholders");
  const selectOptionsTranslation = useTranslations("TaskForm.selectOptions");

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
          <FormLabel>{translateLabel(label)}</FormLabel>
          <FormControl>
            {type === "switch" ? (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            ) : type === "select" ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="max-w-[180px]">
                  <SelectValue
                    placeholder={placeholderTranslation(placeholder)}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {selectOptionsTranslation(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "textarea" ? (
              <Textarea
                placeholder={placeholderTranslation(placeholder)}
                {...field}
              />
            ) : type === "file" ? (
              <Input
                type="file"
                placeholder={placeholder}
                onChange={(e) => field.onChange(e.target.files[0])}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholderTranslation(placeholder)}
                {...field}
              />
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

  const labelTranslation = useTranslations("TaskForm.labels");
  const placeholderTranslation = useTranslations("TaskForm.placeholders");

  const { doFetch } = useMutatingFetch();

  useEffect(() => {
    doFetch(
      "/api/users",
      {
        method: "GET",
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
          <FormLabel>{labelTranslation(label)}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="text-wrap flex h-[unset] max-w-[350px] flex-wrap items-center justify-center pl-3"
              >
                {field.value.length > 0
                  ? field.value
                      .map(
                        (id: string) =>
                          users.find((user) => user.id === id)?.name,
                      )
                      .map((name: string) => <Badge key={name}>{name}</Badge>)
                  : `${placeholderTranslation("Select users")}...`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder={`${placeholderTranslation("Search users")}...`}
                />
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.name ? user.name : undefined}
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
          <FormLabel className="mb-1 block">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-10 w-[280px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Set a deadline date</span>
                )}
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
