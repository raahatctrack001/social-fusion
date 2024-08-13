import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Button, TextInput } from 'flowbite-react';
import { HiPhotograph, HiX } from 'react-icons/hi';
import CopyInput from '../Compnents/CopyInput';

const CreatePost = ({ placeholder }) => {
  const editor = useRef(null);
  const filePickerRef = useRef();
  const [content, setContent] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);  
  const [imageUrl, setImageUrl] = useState();
  const [showURL, setShowURL] = useState(true);

  // Correct usage of useMemo
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/
    placeholder: placeholder || 'Start writing you story...'
  }), [placeholder]);

  console.log(content)

  const handleFileUpload = async (e)=>{
      try {
        console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append("postImage", e.target.files[0]);

        const response = await fetch('/api/v1/users/image-upload', {
          method:"POST",
          body: formData,
        })

        console.log("response: ", response);
        if(!response.ok){
          throw new Error("error uploading file");
        }

        const data = await response.json();
        if(data.success){
          setShowURL(true);
          setImageUrl(data.data?.url)
          console.log("data: ", data.data);
        }
      } catch (error) {
        console.log(error);
      }
  }
  console.log(imageUrl)
  return (

    <div className='w-full'>
      <h1 className='flex justify-center items-center py-2 text-3xl border-b-2'> Create Post </h1>  
      <div className='m-5 min-h-screen'>
          <div className='flex w-full gap-2 justify-center items-center'>
            <TextInput placeholder='Unique Title' className='mb-1 w-3/4' />
            <TextInput 
              onChange={handleFileUpload}
              type='file' ref={filePickerRef}  className='hidden' id='postImage' name='postImage'/>
            <Button outline onClick={()=>filePickerRef.current.click()} className='w-1/4 h-10 mb-1 flex items-center'> Upload Images </Button>
          </div>
          <div className=''>
            
            {showInstructions && <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg mb-1">
              <div className='flex justify-between'>
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Add Images to Your Post</h2> 
                <div className='flex cursor-pointer' onClick={()=>setShowInstructions(false)}>
                  <HiX />
                </div>
              </div>
              <p className="text-blue-700 mb-2">
                To enhance your post with images, follow these simple steps:
              </p>
              <ol className="list-decimal pl-5 text-blue-700">
                <li className="mb-1">Upload Your Image: Use the provided upload image to select and upload your image.</li>
                <li className="mb-1">Get the Image URL: After uploading, copy the popped up URL of the uploaded image.</li>
                <li>Insert the Image: Paste the copied URL into the "URL" field located at second last position in top right corner of the text editor similar to this <HiPhotograph className="inline" />.</li>
              </ol>
              <p className="text-blue-700 mt-2">This will embed the image into your content. Happy posting!</p>
            </div>}

          </div>
          
          <div className='flex'>
            <div className='w-11/12'>
              
            </div>
            <span onClick={()=>{setShowURL(false)}} className='w-1/12 flex justify-end cursor-pointer pr-2 relative top-6 right-1'> <HiX /> </span>

          </div>
          

          {imageUrl && showURL && <div className='flex flex-col'>
            {/* <h1> copy image url </h1>     */}
            <CopyInput url={imageUrl}/>
          </div>}
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
            className='min-h-96'
          />
      </div>
    </div>
  );
};

export default CreatePost;
