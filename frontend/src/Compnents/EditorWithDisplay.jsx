import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import DisplayContent from './DisplayContent'; // Adjust the path as needed

const EditorWithDisplay = () => {
  const [content, setContent] = useState('');
  const [showContent, setShowContent] = useState(false);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const toggleContentDisplay = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      <JoditEditor
        value={content}
        onChange={handleEditorChange}
        className='dark:bg-[rgb(16,23,42)]'
      />
      <button onClick={toggleContentDisplay}>
        {showContent ? 'Hide Content' : 'Show Content'}
      </button>
      {showContent && (
        <DisplayContent content={content} />
      )}
    </div>
  );
};

export default EditorWithDisplay
