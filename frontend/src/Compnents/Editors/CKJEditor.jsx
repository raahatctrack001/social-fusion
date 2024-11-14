import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        toolbar: ['bold', 'italic', 'link', 'imageUpload', 'undo', 'redo'],
        ckfinder: {
          uploadUrl: 'your-image-upload-endpoint',
        },
      }}
    />
  );
};

export default CKEditorComponent;
