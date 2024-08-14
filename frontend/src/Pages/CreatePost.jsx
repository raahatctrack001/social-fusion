import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Alert, Button, Dropdown, TextInput } from 'flowbite-react';
import { HiPhotograph, HiUpload, HiX } from 'react-icons/hi';
import CopyInput from '../Compnents/CopyInput';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useNavigate } from 'react-router-dom';
import EditorWithDisplay from '../Compnents/EditorWithDisplay';
import CustomDropdown from '../Compnents/CustomDropdown';
// import Editor from '../Compnents/EditorWithDisplay';

const CreatePost = ({ placeholder }) => {
  const categories = [
    'Technology',
    'Health & Wellness',
    'Business & Finance',
    'Education',
    'Entertainment',
    'Lifestyle',
    'Travel',
    'Food & Drink',
    'Fashion',
    'Sports',
    'Art & Design',
    'Science',
    'DIY & Crafts',
    'Personal Development',
    'Uncategorised'
  ];

  const navigate = useNavigate();
  const editor = useRef(null);
  const thumbnailRef = useRef(null);
  const filePickerRef = useRef();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);  
  const [imageUrl, setImageUrl] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  // const [thumbnailFile, setThumbnailFile] = useState(null);
  const [showURL, setShowURL] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('')


  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
  };
  // Correct usage of useMemo
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/
    placeholder: placeholder || 'Start formatting you story...'
  }), [placeholder]);

  // console.log(content)

  const handleFileUpload = async (e)=>{
      setShowURL(false);
      setError(null);
      try {
        // console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append("postImage", e.target.files[0]);

        const response = await fetch('/api/v1/users/image-upload', {
          method:"POST",
          body: formData,
        })

        // console.log("response: ", response);
        if(!response.ok){
          setError(response.message)
          throw new Error("error uploading file");
        }

        const data = await response.json();
        if(data.success){
          setShowURL(true);
          setImageUrl(data.data?.url)
          // console.log("data: ", data.data);
        }
        else{
          setError(data.message)
        }
      } catch (error) {
        setError(error.message)
        // console.log(error);
      }
  }

  const handleThumbnailUPload = async(e)=>{
      setShowURL(false);
      setError(null);
      // setThumbnailFile(e.target.files[0]);
      try {
        // console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append("postImage", e.target.files[0]);

        const response = await fetch('/api/v1/users/image-upload', {
          method:"POST",
          body: formData,
        })

        // console.log("response: ", response);
        if(!response.ok){
          setError(response.message)
          throw new Error("error uploading file");
        }

        const data = await response.json();
        if(data.success){
          setShowURL(true);
          setThumbnailURL(data.data?.url)
          // console.log("data: ", data.data);
        }
        else{
          setError(data.message)
        }
      } catch (error) {
        setError(error.message)
        // console.log(error);
      }
  }


  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };
  
  const handlePostUpload = async (e)=>{
    e.preventDefault();
    try {
        setError(null)

        if(!selectedCategory){
          setError("please select category!")
          return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", selectedCategory);
        formData.append("thumbnail", thumbnailURL);
        
        const response = await fetch(apiEndPoints.createPostAddress(), {
          method: "POST",
          body:formData,
        })
        
        if(!response.ok){
          setError(response.message)
          return;
          // throw new Error("failed to upload post!")
        }
        const data = await response.json();
        if(data.success){
          navigate(`/posts/post/${data?.data?._id}`);
        }else{
          setError(data.message)
        }
        // console.log("data extracted", data.data);
    } catch (error) {
      setError(error.message)
      console.log(error);
    }
  }
  // console.log(selectedCategory)
  return (

    <div className='w-full bg-gray-300 border-2 border-rose-900 md:px-10 rounded-lg'>
      <h1 className='flex justify-center items-center py-2 text-3xl border-b-2'> Create Post </h1>  
      <div className='m-5 min-h-screen'>
          <div className='flex w-full gap-2 justify-center items-center'>
            <TextInput placeholder='Unique Title' className='mb-1 w-3/4' onChange={(e)=>setTitle(e.target.value)}/>
            <TextInput 
              onChange={handleFileUpload}
              type='file' ref={filePickerRef}  className='hidden' id='postImage' name='postImage'/>
            <Button outline onClick={()=>filePickerRef.current.click()} color={''} className='w-1/4  h-8 md:h-10 mb-1 flex items-center hover:bg-gray-500 '> <span className='flex items-center justify-center mr-1'> <HiUpload /></span> <span className='hidden md:inline mr-1'>Upload</span> Images </Button>
          </div>

          <div>
            <TextInput onChange={handleThumbnailUPload} ref={thumbnailRef} className='hidden' type='file'/>
            <Button onClick={()=>thumbnailRef.current.click()} className='w-full hover:bg-gray-500' color={''}  outline> Upload Thumbnail Image </Button>
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
          
          

          {imageUrl && showURL && <div className='flex flex-col'>
          <div className='flex'>
            <div className='w-11/12'>              
            </div>
            <span onClick={()=>{setShowURL(false)}} className='w-1/12 flex justify-end cursor-pointer pr-2 relative top-6 right-1'> <HiX /> </span>

          </div>
            {/* <h1> copy image url </h1>     */}
            <CopyInput url={imageUrl}/>
          </div>}

          {/* <EditorWithDisplay /> */}
          {thumbnailURL && <img src={thumbnailURL} alt="thumbnail" />}
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
            className=''
          />
          
          {/* <EditorWithDisplay /> */}
          <div className="w-full flex justify-center mt-2 ">
            <CustomDropdown options={categories} onSelect={handleCategorySelect} />

          </div>
          {error && <Alert color={"failure"} className='flex justify-center items-center'><span>{error}</span></Alert>}
          <Button onClick={handlePostUpload} color={"warning"} className='w-full my-2'> Upload now </Button>
      </div>
    </div>
  );
};

export default CreatePost;

