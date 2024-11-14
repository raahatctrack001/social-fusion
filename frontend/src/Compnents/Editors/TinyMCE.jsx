import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ value, onChange }) => {
  return (
    <Editor
      apiKey="k4or5qfykkew8q74zelphwjzo92ep7iy48cu6p1reuhdzekf" // Use your actual API key here
      initialValue={value}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={onChange}
    />

  );
};

export default TinyMCEEditor;
