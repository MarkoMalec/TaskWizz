"use client";

import React, { useEffect, useState, useRef } from "react";
import format from "date-fns/format";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Skeleton } from "~/components/ui/skeleton";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent } from "~/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PenSquare } from "lucide-react";

export const EditableInputField = ({
  initialValue,
  nonFormatDate,
  name,
  onSave,
  isMutating,
  type,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      (inputRef.current as HTMLInputElement | HTMLTextAreaElement).focus(); // Auto-focus the input when editing
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (value === initialValue) {
      setIsEditing(false);
      return;
    }
    setIsEditing(false);
    onSave(name, value);
  };

  const handleOnDateChange = (selectedDate: any) => {
    setValue(selectedDate);
    onSave(name, selectedDate);
  };

  if (isEditing) {
    return (
      <>
        {type === "datepicker" ? (
          <div className="absolute top-0 bg-secondary p-3">
            <Calendar
              mode="single"
              selected={nonFormatDate}
              onSelect={handleOnDateChange}
              initialFocus
            />
          </div>
        ) : type === "textarea" ? (
          <Textarea
            ref={inputRef}
            value={value}
            onBlur={handleSave}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-[300px]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
                e.preventDefault();
              }
            }}
          />
        ) : (
          <Input
            ref={inputRef}
            value={value}
            onBlur={handleSave}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-[400px]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
                e.preventDefault();
              }
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="group flex items-start justify-between gap-2 rounded-md py-1 pr-2 hover:bg-primary/5">
      {isMutating ? (
        <Skeleton className="h-[30px] w-[100%] max-w-[400px] rounded-full" />
      ) : (
        <div className="max-w-[92%] text-primary/70">{value}</div>
      )}
      <button
        className="ml-2 hidden rounded bg-primary px-1 hover:bg-primary/80 group-hover:block"
        onClick={handleEdit}
      >
        <PenSquare className="w-4 stroke-secondary" />
      </button>
    </div>
  );
};

export const EditableDatepickerField = ({
  initialValue,
  nonFormatDate,
  name,
  onSave,
  isMutating,
  type,
}: any) => {
  const [value, setValue] = useState(initialValue);

  const handleOnDateChange = (selectedDate: any) => {
    const newValue = new Date(selectedDate);
    const formattedDate = format(newValue, "dd.MM.yyyy");
    setValue(formattedDate);
    onSave(name, selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger className="rounded-md bg-primary/5 px-2 py-1">
        {isMutating ? <Skeleton className="h-[21px] w-[82px]" /> : value}
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={nonFormatDate}
          onSelect={handleOnDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
