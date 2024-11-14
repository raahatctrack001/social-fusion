import React, { useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  React.useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['image', 'code-block'],
        ],
      },
    });

    quill.on('text-change', () => {
      onChange(quill.root.innerHTML);
    });
  }, [onChange]);

  return (
    <div>
      <div ref={editorRef} />
    </div>
  );
};

export default QuillEditor;
