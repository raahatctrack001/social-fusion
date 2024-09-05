import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Alert, Button, Dropdown, TextInput } from 'flowbite-react';
import { HiPhotograph, HiUpload, HiX } from 'react-icons/hi';
import CopyInput from '../Compnents/CopyInput';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useNavigate } from 'react-router-dom';
import EditorWithDisplay from '../Compnents/EditorWithDisplay';
import CustomDropdown from '../Compnents/CustomDropdown';
import { useSelector } from 'react-redux';
import LoaderPopup from '../Compnents/Loader';
import "../Compnents/CustomJoditStyles.css"

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
  const [loading, setLoading] = useState(false);
  const [showURL, setShowURL] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('')
  const { theme } = useSelector(state=>state.theme)


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
      setLoading(true)
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
      finally{
        setLoading(false)
      }
  }

  const handleThumbnailUPload = async(e)=>{
      setLoading(true)
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
      finally{
        setLoading(false)
      }
  }


  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };
  
  const handlePostUpload = async (e)=>{
    // setLoading(true)?
    setLoading(true)
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
        
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || "Network response is not ok while creating post!")
          // throw new Error("failed to upload post!")
        }
        if(data.success){
          navigate(`/posts/post/${data?.data?._id}`);
        }
        
    } catch (error) {
      setError(error.message)
 
    }
    finally{
      setLoading(false)
    }
  }
  // console.log(selectedCategory)
  // console.log("laoding", loading)
  return (
    <div className='w-full border-2 border-rose-900 md:px-10 rounded-lg'>

      {loading && <LoaderPopup loading={loading} info="We are uploading your file" setLoading={setLoading} />}
      
         
    <h1 className='flex justify-center items-center py-2 text-3xl border-b-2'> Create Post </h1>  
    {theme === 'dark' && <p className='w-full grid place-items-center font-bold text-red-700'> Please switch to light mode for better experience while writing post! </p>    }
    {thumbnailURL && <div className='flex justify-center items-center overflow-scroll mt-2 w-full'>
      <img className='p-5 w-1/2 max-h-96 rounded-3xl aspect-auto' src={thumbnailURL} alt="thumbnail" />
    </div>}
      <div className='m-5 min-h-screen'>
          <div className='flex w-full gap-2 justify-center items-center'>
            <TextInput placeholder='Unique Title' className='mb-1 w-3/4 border-2 rounded-lg' onChange={(e)=>setTitle(e.target.value)}/>
            <TextInput 
              onChange={handleFileUpload}
              type='file' ref={filePickerRef}  className='hidden' id='postImage' name='postImage'/>
            <Button outline onClick={()=>filePickerRef.current.click()} color={''} className='w-1/4  h-8 md:h-10 mb-1 flex items-center border-2 hover:bg-gray-500 '> <span className='flex items-center justify-center mr-1'> <HiUpload /></span> <span className='hidden md:inline mr-1'>Insert</span> Image </Button>
          </div>

          <div>
            <TextInput onChange={handleThumbnailUPload} ref={thumbnailRef} className='hidden' type='file' />
            <Button onClick={()=>thumbnailRef.current.click()} className=' border-2 mb-1 w-full hover:bg-gray-500' color={''}  outline> {thumbnailURL ? "Update thumbnail image" : "Upload Thumbnail Image"} </Button>
          </div>
          <div className=''>
            
            {showInstructions && <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg mb-1">
              <div className='flex justify-between'>
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Add Images to Your Post</h2> 
                <div className='flex cursor-pointer' onClick={()=>setShowInstructions(false)}>
                  <HiX className='dark:text-red-600'/>
                </div>
              </div>
              <p className="text-blue-700 mb-2">
                To enhance your post with images, follow these simple steps:
              </p>
              <ol className="list-decimal pl-5 text-blue-700">
                <li className="mb-1 flex justify-start items-center">Upload Your Image: Use the provided upload image <span className='border-2 p-1 rounded-lg flex gap-1 justify-center items-center w-32'><HiUpload /> <span className='hidden md:inline'> Insert </span> Image</span>to select and upload your image.</li>
                <li className="mb-1">Get the Image URL: After uploading, copy the popped up URL of the uploaded image.</li>
                <li>Insert the Image: Paste the copied URL into the "URL" field located at second last position in top right corner of the text editor similar to this <HiPhotograph className="inline" /> also give name of image in alternate text field (Optional).</li>
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
            <CopyInput url={imageUrl}/>
          </div>}
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
          <Button onClick={handlePostUpload} color={"primary"} className='w-full my-2 border-2 hover:bg-gray-500'> Upload now </Button>
      </div>
    </div>
  );
};

export default CreatePost;

