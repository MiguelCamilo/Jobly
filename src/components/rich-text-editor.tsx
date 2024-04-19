"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        {...props}
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 mt-4",
          props.editorClassName,
        )}
      />
    );
  },
);
