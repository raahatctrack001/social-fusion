import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineX } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { updateSuccess } from '../redux/slices/user.slice';

// const highlights = [
//   {
//     name: 'Travel',
//     thumbnail: 'https://via.placeholder.com/100',
//   },
//   {
//     name: 'Food',
//     thumbnail: 'https://via.placeholder.com/100',
//   },
//   {
//     name: 'Fitness',
//     thumbnail: 'https://via.placeholder.com/100',
//   },
//   {
//     name: 'Music',
//     thumbnail: 'https://via.placeholder.com/100',
//   },
//   // Add more highlights as needed
// ];

const SelectHighlightPopup = ({isOpen, setIsOpen, story}) => {
  
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [highlights, setHighlights] = useState([]);
  
  useEffect(()=>{
    (async()=>{
       try {
        const response = await fetch(apiEndPoints.getHighlightsOfUser(currentUser?._id));
        const data = await response.json();
 
        if(!response.ok){
          throw new Error(data.message || "Network response wasn't ok while getting highlights")
        }
        if(data.success){
            setHighlights(data?.data);
        }
       } catch (error) {
            console.log(error);
       }
    })()
  }, [isOpen])

  const handleSelectHighlight = async (highlight)=>{
    try {
        const response = await fetch(apiEndPoints.addStoryToHighlight(highlight?._id, story?._id, currentUser?._id), {method: "PATCH"});
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Network response isn't ok while adding story to highlight");
        }

        if(data.success){
            alert(data.message);
            dispatch(updateSuccess(data?.data?.currentUser));  
            setIsOpen(false)          
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="p-4">
      {/* <Button onClick={openModal}>
        Show All Highlights
      </Button> */}

      <Modal show={isOpen} onClose={closeModal} size="5xl" >
        <Modal.Header>
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-semibold">
              Select Highlights      
            </h3>
            {/* <HiOutlineX className="cursor-pointer" onClick={closeModal} /> */}
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="flex flex-wrap gap-4 justify-center ">
            {highlights?.length > 0 ? highlights.map((highlight, index) => (
              <div
                onClick={()=>handleSelectHighlight(highlight)}
                key={index}
                className="relative flex flex-col items-center justify-center min-h-20 min-w-20 md:h-32 md:w-32 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl cursor-pointer transition-transform transform hover:scale-105"
              >
                <img
                  src={highlight.thumbnail}
                  className="h-16 w-16 md:h-24 md:w-24 rounded-full object-cover"
                  alt={highlight.name}
                />
                <div className="absolute bottom-4 w-full text-center">
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg py-1 px-2 font-bold text-sm opacity-90">
                    {highlight.name.length > 13
                      ? highlight.name.substring(0, 13) + "..."
                      : highlight.name}
                  </div>
                </div>
              </div>
            )): <div> No Highlights, please create one to add... </div>}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SelectHighlightPopup;
