"use client";

import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Skeleton } from "~/components/ui/skeleton";
import { PenSquare } from "lucide-react";

export const EditableInputField = ({
  initialValue,
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

  if (isEditing) {
    return (
      <>
        {type === "datepicker" ? (<div></div>) : type === "textarea" ? (
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
      <button className="hidden group-hover:block ml-2" onClick={handleEdit}>
        <PenSquare className="w-4 hover:stroke-cyan-500" />
      </button>
    </div>
  );
};
