import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import useFolder from "../../../hooks/useFolder";

interface Props {
  fileName: string | undefined;
}

const RichEditor = ({ fileName }: Props) => {
  const isReady = useRef(false);
  const { getJournalEntry, updateJournalEntry } = useFolder();

  useEffect(() => {
    if (!isReady.current) {
      const Header = require("@editorjs/header");
      const List = require("@editorjs/list");
      const Underline = require("@editorjs/underline");
      const CodeTool = require("@editorjs/code");
      const data = getJournalEntry(fileName);

      const editor = new EditorJS({
        placeholder: "Hello there!",
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            shortcut: "CTRL+H",
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3],
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: "CTRL+L",
            config: {
              defaultStyle: "unordered",
            },
          },
          underline: Underline,
          code: {
            class: CodeTool,
            inlineToolbar: true,
            shortcut: "CTRL+SHIFT+C",
          },
        },
        data: data,
        async onChange(api, event) {
          console.log("changed", editor);
          editor.save().then((data) => {
            console.log(data);
            updateJournalEntry(fileName, JSON.stringify(data));
          });
        },
      });
      
      isReady.current = true;

    }
  }, []);

  return (
    <article className="prose w-full mt-4">
      <div id="editorjs" className="" />
    </article>
  );
};

export default RichEditor;


// const DefaultElement = (props: any) => {
//   return <p {...props.attributes}>{props.children}</p>;
// };

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";

// import {
//   ListBulletIcon,
//   ArrowUturnLeftIcon,
//   ArrowUturnRightIcon,
// } from "@heroicons/react/24/solid";

// const RichEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: {
//           levels: [1, 2],

//         },
//       }),
//       Placeholder.configure({
//         placeholder: 'Write something...'
//       })
//     ],
//     content: "<h1>Hello</h1><p>Hello again<p/>",
//   });

//   return (
//     <div className="flex flex-col space-y-3">
//       <MenuBar editor={editor} />
//       <EditorContent editor={editor} className="" />
//     </div>
//   );
// };

// const MenuBar = ({ editor }: { editor: any }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="flex items-center space-x-4 font-mono">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={editor.isActive("bold") ? "is-active" : ""}
//       >
//         B
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         disabled={!editor.can().chain().focus().toggleItalic().run()}
//         className={editor.isActive("italic") ? "is-active italic" : "italic"}
//       >
//         I
//       </button>
//       {/* <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         disabled={!editor.can().chain().focus().toggleStrike().run()}
//         className={editor.isActive("strike") ? "is-active" : ""}
//       >
//         strike
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCode().run()}
//         disabled={!editor.can().chain().focus().toggleCode().run()}
//         className={editor.isActive("code") ? "is-active" : ""}
//       >
//         code
//       </button> */}
//       {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
//         clear marks
//       </button>
//       <button onClick={() => editor.chain().focus().clearNodes().run()}>
//         clear nodes
//       </button> */}
//       <button
//         onClick={() => editor.chain().focus().setParagraph().run()}
//         className={editor.isActive("paragraph") ? "is-active" : ""}
//       >
//         P
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
//         className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
//       >
//         h1
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
//       >
//         h2
//       </button>
//       {/* <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
//       >
//         h3
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//         className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
//       >
//         h4
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
//         className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
//       >
//         h5
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
//         className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
//       >
//         h6
//       </button> */}
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={editor.isActive("bulletList") ? "is-active" : ""}
//       >
//         <ListBulletIcon className="w-6 h-6" />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={editor.isActive("orderedList") ? "is-active" : ""}
//       >
//         1.
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         className={editor.isActive("codeBlock") ? "is-active" : ""}
//       >
//         Code
//       </button>
//       {/* <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={editor.isActive("blockquote") ? "is-active" : ""}
//       >
//         blockquote
//       </button> */}
//       {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
//         horizontal rule
//       </button>
//       <button onClick={() => editor.chain().focus().setHardBreak().run()}>
//         hard break
//       </button> */}
//       <button
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().chain().focus().undo().run()}
//       >
//         <ArrowUturnLeftIcon className="w-6 h-6 " />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().chain().focus().redo().run()}
//       >
//         <ArrowUturnRightIcon className="w-6 h-6" />
//       </button>
//     </div>
//   );
// };

// export default RichEditor;
