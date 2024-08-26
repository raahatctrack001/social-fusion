import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import HighlightNamePopup from './HighlightNamePopup';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccess } from '../redux/slices/user.slice';
import LoaderPopup from './Loader';
import { Alert } from 'flowbite-react';
// import apiResponse from '../../../backend/src/Utils/apiResponse';

const HighlightSelector = ({highlightName, stories, onClose, setHighlights }) => {
    const { currentUser } = useSelector(state=>state.user)
    const [selectedStories, setSelectedStories] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

  const toggleSelection = (storyId) => {
    if (selectedStories.includes(storyId)) {
      setSelectedStories(selectedStories.filter(id => id !== storyId));
    } else {
      setSelectedStories([...selectedStories, storyId]);
    }
  };

  const onAddToHighlight = async ()=>{
    //   console.log("stories selected are: ", selectedStories);
    //   console.log("hightlights name chosen are: ", highlightName);
      try {
        setError('')
        setLoading(true)
        const formData = new FormData();
        formData.append("name", highlightName);
        formData.append("stories", selectedStories);
        const response = await fetch(apiEndPoints.createNewHighlights(currentUser?._id), {method:"POST", body:formData});
        const data = await response.json()

        if(!response.ok){
            throw new Error(data?.message || "Network response isn't ok while creating highlights!" )
        }
        // console.log(data);
        if(data.success){
            console.log("fromhighlightselector", data?.data?.currentUser?.highlights)
            dispatch(updateSuccess(data?.data?.currentUser));
            setHighlights(data?.data?.currentUser?.highlights)
            console.log("console.log0", data);
        }
    } catch (error) {
        setError(error.message)
        console.log(error)
    }   
    finally{
        setLoading(false)
        onClose(false); // Close the popup after adding to highlight
      }



  }
  const handleAddToHighlight = () => {
    // Call a function to handle adding selected stories to highlights
    // setShowHighlightName(true)
    onAddToHighlight(selectedStories);
    setSelectedStories([]); // Clear selection after adding to highlight
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
    {/* { <HighlightNamePopup isOpen={showHighlightName} onClose={setShowHighlightName} />} */}
    {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"creating new highlights! please wait..."} />}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full lg:w-3/4 max-h-96" style={{ maxHeight: '700px' }}>
        <div className='flex justify-between'>        
            <h1 className="text-2xl font-bold mb-4">Select Stories for Highlight</h1>
            <HiX onClick={()=>onClose(false)} className='cursor-pointer'/> 
        </div>
        {selectedStories?.length ?  <p className='w-full flex justify-center items-center text-xl font-bold mb-2'> {selectedStories?.length} stories selected</p> : <p> </p>}
            {error && <Alert className='w-full flex items-center mb-1' color={'failure'}> {error} </Alert>}
        {stories?.length === 0 ? (
          <h2>No stories yet! Please add stories to add to highlights...</h2>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
                {stories.map((story) => (
                    <div
                    key={story._id}
                    onClick={() => toggleSelection(story._id)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedStories.includes(story._id) ? 'border-blue-500' : 'border-transparent'
                    }`}
                    >
                    <img
                        src={story.contentURL}
                        alt="Story"
                        className="w-full h-40 object-cover"
                    />
                    {selectedStories.includes(story._id) && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Selected</span>
                        </div>
                    )}
                    </div>
                ))}
                </div>

        )}
        <div className="flex justify-between mt-4">
          <button 
            onClick={()=>onClose(false)} 
            className="px-4 py-2 bg-gray-500 text-white font-bold rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToHighlight}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
            disabled={selectedStories.length === 0}
          >
            Add to Highlight
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightSelector;
