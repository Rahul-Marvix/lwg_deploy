'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

const Toolbar = ({ editor }) => {
  return (
    <div className="toolbar">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      {/* Add more buttons for other formatting options as needed */}
    </div>
  );
};
export default function TiptapTextEditor() {
    const [value,setvalue]=useState("")
    const editor = useEditor({ 
        extensions: [
          StarterKit.configure(),
        ],
        content: value,
        editorProps:{
            attributes:{class:"border border-black"}
        },onUpdate({editor}){
            setvalue(editor.getHTML())
            console.log(editor.getHTML());
        }
      })
  return (
    <div>
        <toolbar editor={ editor}/>
        <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}


