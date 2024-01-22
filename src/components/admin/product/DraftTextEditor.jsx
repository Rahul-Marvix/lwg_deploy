import React, { useState, useEffect } from "react";
import {  EditorState, RichUtils,convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from 'draftjs-to-html';
import DOMPurify from 'dompurify';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [htmlContent, setHtmlContent] = useState('');

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const updatedHtmlContent = stateToHTML(newEditorState.getCurrentContent());
    console.log(updatedHtmlContent,".......");
    setHtmlContent(updatedHtmlContent);
  };;
//   useEffect(() => {
//     let html = convertToHTML(editorState.getCurrentContent());
//     setConvertedContent(html);
//     console.log(html);
//   }, [editorState]);

  return (
    <div className="border border-black ">
      <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleEditorChange}
      hashtag={{
        separator: ' ',
        trigger: '#',
      }}
      toolbar={{
        options: ['inline', 'blockType']
      }}
      />
    </div>
  );
}