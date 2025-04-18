import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Alert, Button, Dropdown, TextInput } from 'flowbite-react';
import { HiPhotograph, HiUpload, HiX } from 'react-icons/hi';
import CopyInput from '../../Compnents/CopyInput';
import { apiEndPoints } from '../../apiEndPoints/api.addresses';
import { useNavigate, useParams } from 'react-router-dom';
// import EditorWithDisplay from '../Compnents/EditorWithDisplay';
import CustomDropdown from '../../Compnents/CustomDropdown';
import { useSelector } from 'react-redux';
import EditorForSummary from './EditorForSummary';
import GlobalModal from '../../Compnents/GlobalModela';
import AddMessagePopup from '../../Compnents/AddMessagePopup';
import PageLoader from '../../Compnents/PageLoader';
// import Editor from '../Compnents/EditorWithDisplay';

export default function ContributeBook({ placeholder }){
  const { contributionId, bookId } = useParams();
  const contributionDetail = JSON.parse(localStorage.getItem("bookToContribute"));
  const bookData = contributionDetail.documentId;
  console.log("data from local storage", bookData)
  const { currentUser } = useSelector(state=>state.user)

  const navigate = useNavigate();
  const editor = useRef(null);
  const thumbnailRef = useRef(null);
  const filePickerRef = useRef();
  const [content, setContent] = useState(contributionDetail.contributedContent?.length > 0 ? contributionDetail.contributedContent.at(-1).content: bookData.content);
  const [title, setTitle] = useState(bookData?.title||'');
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);  
  const [imageUrl, setImageUrl] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(bookData?.coverPage.at(-1)||'');
  // const [thumbnailFile, setThumbnailFile] = useState(null);
  const [showURL, setShowURL] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(bookData?.category)
  const [showMessageBox, setShowMessageBox] = useState(false); 
  const [loading, setLoading] = useState(false);

  const { theme } = useSelector(state=>state.theme)

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/
    placeholder: placeholder || 'Start formatting you story...'
  }), [placeholder]);


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

  
  const handlePostUpdate = async (message)=>{      
     setLoading(true)
      try {
          setError(null)
          
          if(!selectedCategory){
              setError("please select category!")
          return;
        }
        const formData = new FormData();
        formData.append("content", content);
        formData.append("message", message);
        
        // console.log(apiEndPoints.updateContriution(contributionId, bookId, currentUser?._id))
        const response = await fetch(apiEndPoints.updateContriution(contributionId, bookId, currentUser?._id), {
            method: "PUT",
            body: formData,
        })
        const data = await response.json();
      
        if(!response.ok){
            throw new Error(data.message || "Network response isn't ok while updating post")
            // throw new Error("failed to upload post!")
        }
       
        if(data.success){
            //console.log("data");
            localStorage.removeItem("bookToContribute");
            navigate(`/dashboard?tab=contributions`);
        }
        // //console.log("data extracted", data.data);
      } catch (error) {
        alert(error.message)
        setError(error.message)
        //console.log(error);
    }
    finally{setLoading(false)}
  }
  // console.log(selectedCategory)
  const handlePublishClick = async (e)=>{
    const formData = new FormData();
    formData.append("content", content);
    
    await fetch(apiEndPoints.updatePostAddress(bookData?._id), {
        method: "PUT",
        body: formData,
    })

    if(!bookData.summary){
      alert("Please add summary from button located at the top of editor before you publish the book.")
      return;
    }

    navigate(`/books/book/publish/${bookData._id}`)
  }

  const getMessageContent = ( message )=>{
    handlePostUpdate(message);
    setShowMessageBox(setShowMessageBox(false));

  }

  if(showMessageBox){
    if(bookData?.content === content){
        alert("Please make changes to save");
        setShowMessageBox(false)
        return;
    }
    return  <div className='w-full max-w-7xl'>  <AddMessagePopup 
            isOpen={showMessageBox}
            onClose={setShowMessageBox}
            onSave={getMessageContent}
            />
            </div> 
  }
  if(loading){
    return <PageLoader info={"Saving History"} />
  }
  return (

    <div className='w-full border-2 md:px-10 rounded-lg'>
      <h1 className='flex justify-center items-center py-2 text-3xl border-b-2'> Continue writing your books </h1>  
      {theme === 'dark' &&     <p className='w-full grid place-items-center'> Please switch to light mode for better experience while writing post! </p>    }

      <div className='m-5 min-h-screen'>
          <div className='flex w-full gap-2 justify-center items-center'>
            <TextInput disabled placeholder='Unique Title' className='mb-1 w-3/4' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <TextInput 
              onChange={handleFileUpload}
              type='file' ref={filePickerRef}  className='hidden' id='postImage' name='postImage'/>
            <Button 
                outline 
                onClick={()=>filePickerRef.current.click()} 
                color={''} 
                className='w-1/4  h-8 md:h-10 mb-1 flex items-center hover:bg-gray-500 border-2'> 
                <span className='flex items-center justify-center mr-1'> 
                    <HiUpload />
                </span>
                <span className='hidden md:inline mr-1'>
                    Upload
                </span> 
                    Images 
            </Button>
          </div>

          <div className='flex justify-between gap-2'>
           
          </div>
          <div className=''>
            
            {showInstructions && <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg mb-1">
              <div className='flex justify-between'>
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Update Images to Your book</h2> 
                <div className='flex cursor-pointer' onClick={()=>setShowInstructions(false)}>
                  <HiX />
                </div>
              </div>
              <p className="text-blue-700 mb-2">
                To enhance your book with images, follow these simple steps:
              </p>
              <ol className="list-decimal pl-5 text-blue-700">
                <li className="mb-1">Upload Your Image: Use the provided upload image to select and upload your image.</li>
                <li className="mb-1">Get the Image URL: After uploading, copy the popped up URL of the uploaded image.</li>
                <li>Insert the Image: Paste the copied URL into the "URL" field located at second last position in top right corner of the text editor similar to this <HiPhotograph className="inline" />.</li>
              </ol>
              <p className="text-blue-700 mt-2">This will embed the image into your content. Happy writing!</p>
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
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
            className=''
          />
          
          
          {error && <Alert color={"failure"} className='flex justify-center items-center'><span>{error}</span></Alert>}
          <div className='flex gap-2'>            
            <Button onClick={()=>setShowMessageBox(true)} color={"warning"} className='w-full my-2'> Update Draft </Button>
            {bookData && <Button color={'failure'} className='w-full my-2' onClick={handlePublishClick}> Add Pull Request </Button>}
          </div>
      </div>
    </div>
  );
};

