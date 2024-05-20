"use client"
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    readOnly: boolean;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange , readOnly }) => {
    return <ReactQuill theme="snow" readOnly={readOnly} value={value} onChange={onChange} />;
};

export default QuillEditor;
