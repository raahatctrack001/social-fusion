import React from 'react';

const DisplayContent = ({ content }) => {
    // console.log(content)
  return (
    <div className='my-2' dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default DisplayContent;
