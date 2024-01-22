'use client'
import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};


export default function CustomEditor({ initialData,setDescription }) {
    return (
        <div className='border border-black'>
            
        <CKEditor
            editor={ Editor }
            config={ editorConfiguration }
            data={ initialData }
            onChange={ (event, editor ) => {
                const data = editor.getData();
                setDescription(data)
                // console.log( { event, editor, data } );
            } }
        />
                </div>
    )
}
