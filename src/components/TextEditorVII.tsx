import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

export const TextEditorVII: React.FC = () => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 1000;

  const handleContentChange = (event: any, editor: any) => {
    const data = editor.getData();
    setCharCount(data.length);
    if (data.length <= maxCharCount) {
      setText(data);
    }
  };

  return (
    <>
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            handleContentChange(event, editor); // Pass both event and editor parameters
          }}
        />
        <small>
          Characters: {charCount}/{maxCharCount}
        </small>
      </div>
      <div>
        <h2>Content</h2>
        <p>{parse(text)}</p>
      </div>
    </>
  );
};
