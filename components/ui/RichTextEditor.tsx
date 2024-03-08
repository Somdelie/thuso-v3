"use client";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import { cn } from "@/lib/utils";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        editorClassName={cn(
          "border rounded px-3 min-h-[150px] border-gray-500 cursor-text dark:text-gray-300 ring-offset-none focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2",
          props.editorClassName
        )}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        {...props}
      />
    );
  }
);
