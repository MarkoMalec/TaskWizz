"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import { Button } from "~/components/ui/button";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import {
  BoldIcon,
  Code2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  ListStartIcon,
  Loader2Icon,
  QuoteIcon,
  StrikethroughIcon,
  Undo2Icon,
} from "lucide-react";

const NoteEditor = ({ taskId }: { taskId: String }) => {
  const { isMutating, doFetch } = useMutatingFetch();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  if (!editor) {
    return <Loader2Icon className="h-8 w-8 animate-spin" />;
  }

  const saveNote = async () => {
    const content = editor.getHTML();

    try {
      await doFetch("/api/notes/create", {
        method: "POST",
        body: JSON.stringify({ content, taskId }),
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="light:bg-secondary rounded-md pt-1 dark:bg-[#12161c7d]">
      <EditorContent editor={editor} />
      <div className="align-center flex justify-between border-t px-4 py-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1Icon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3Icon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2Icon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrderedIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <QuoteIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <code>{"{}"}</code>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code2Icon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2Icon className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            size="xs"
            variant="default"
            onClick={() => {
              console.log(editor.getHTML());
              saveNote();
            }}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
