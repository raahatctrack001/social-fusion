import React from 'react';

const DisplayContent = ({ content }) => {
    console.log(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default DisplayContent;
