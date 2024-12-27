"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import getInitials from "~/lib/getInitials";
import { Note } from "~/lib/types";
import { FileTextIcon } from "lucide-react";
import format from "date-fns/format";
import { set } from "date-fns";

export const SingleNote = ({ note }: { note: Note }) => {
  const notePublishDate = format(new Date(note.createdAt), "dd.MM.yyyy");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex gap-2 md:gap-5">
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <FileTextIcon className="h-5 w-5 opacity-75" />
        </div>
      </div>
      <div className="note w-full rounded-lg border bg-secondary dark:bg-[#12161c7d]">
        <div className="flex items-center gap-2 rounded-tl-lg rounded-tr-lg px-2 py-1 dark:bg-[#12161c7d]">
          <Avatar className="h-6 w-6">
            <AvatarImage src={note.createdBy.image} />
            <AvatarFallback>{getInitials(note.createdBy.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{note.createdBy.name}</span>

          <div className="text-xs text-muted-foreground">{notePublishDate}</div>
        </div>
        <div
          className="px-4 py-3"
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
      </div>
    </div>
  );
};
