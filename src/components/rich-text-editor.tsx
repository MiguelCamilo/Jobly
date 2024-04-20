"use client";

import { forwardRef } from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// using dynamic import stops the <Editor /> from being rendered
// with ssr instead it will be rendered client side
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

export default forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        {...props}
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) ref.current = r;
        }}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 mt-4",
          props.editorClassName,
        )}
      />
    );
  },
);
