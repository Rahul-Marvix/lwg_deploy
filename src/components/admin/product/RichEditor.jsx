"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-image-resize-module-react";

const modules = {
  toolbar: [
    // Headers
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // Lists
    ["list", "bullet", "indent", "outdent"],

    // Other formats
    ["bold", "italic", "underline"],

    // Image insertion
    ["image"],
  ],
  imageResize: {
    displaySize: true,
  },
};

export default function RichEditor() {
  const [value, setValue] = useState();

  const handleImageUpload = (file) => {
    // Handle image upload logic here (e.g., send to server, get URL)
    const imageUrl = "https://example.com/image.jpg"; // Replace with actual URL
    setValue(value.insertEmbed(value.length, "image", imageUrl));
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={setValue}
        className="editor-input"
        modules={modules}
        formats={true} // Enable all default formats
        handlers={{ image: handleImageUpload }}
      />
    </div>
  );
}
