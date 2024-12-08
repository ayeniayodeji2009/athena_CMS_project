// import React, { useState } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import "../../../node_modules/react-quill/dist/quill.snow.css"
import "./styles/tool_components.css"

const ReactQuillEditor = ({value, setValue}) => {

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'align': [] }],
            [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    return (
        <div>
            <ReactQuill value={value} onChange={setValue} modules={modules} className="react-quill-editor" />
        </div>
    );
};

export default ReactQuillEditor;
