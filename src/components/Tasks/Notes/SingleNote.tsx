import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import getInitials from "~/lib/getInitials";
import { Note } from "~/lib/types";

export const SingleNote = ({ note }: { note: Note }) => {
  return (
    <div className="note rounded-lg border bg-secondary dark:bg-[#12161c7d]">
      <div className="flex items-center gap-2 rounded-tl-lg rounded-tr-lg px-2 py-1 dark:bg-[#12161c7d]">
        <Avatar className="h-6 w-6">
          <AvatarImage src={note.createdBy.image} />
          <AvatarFallback>{getInitials(note.createdBy.name)}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{note.createdBy.name}</span>
      </div>
      <div
        className="px-4 py-3"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </div>
  );
};
