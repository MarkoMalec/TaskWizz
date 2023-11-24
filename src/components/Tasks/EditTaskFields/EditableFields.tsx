"use client";

import React, { useState } from "react";
import format from "date-fns/format";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Skeleton } from "~/components/ui/skeleton";
import { PenSquare } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent } from "~/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

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

  const handleEdit = () => setIsEditing(true);

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
        )}
      </>
    );
  }

  return (
    <div className="group flex gap-2">
      {isMutating ? (
        <Skeleton className="h-[25px] w-[100%] max-w-[300px] rounded-full" />
      ) : (
        value
      )}
      <button className="ml-2 hidden group-hover:block" onClick={handleEdit}>
        <PenSquare className="w-4 hover:stroke-cyan-500" />
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

  console.log(initialValue, "initial date value");
  console.log(value, 'state value')

  const handleOnDateChange = (selectedDate: any) => {
    const newValue = new Date(selectedDate);
    const formattedDate = format(newValue, "dd.MM.yyyy");
    setValue(formattedDate);
    onSave(name, selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger>{value}</PopoverTrigger>
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