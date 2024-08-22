import { formatISODuration } from 'date-fns';
import { Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { apiEndPoints } from '../apiEndPoints/api.addresses';

const EditCommentPopup = ({showEditPopup, setShowEditPopup, comment}) => {
    // const [editContent, setEditContent] = useState(comment);
    const [formData, setFormData] = useState({content: comment?.content||''})
    console.log(formData)

    const handleEditCommentSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(apiEndPoints.updateCommentsAddress(comment?._id), {
                method: "PATCH",
                body: formData,
            })
            const data = await response.json();
            if(!response.ok){
                console.log(data.message||"Network response is not ok!")
            }

            if(data.success){
                
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex justify-center items-center h-screen">
       <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="p-6 rounded-lg shadow-lg w-96">
            <div className='flex justify-between items-center '> 
                <div> </div> 
                <button
                    className="px-4 flex justify-center items-center gap-2 py-2 bg-red-600 text-white font-semibold rounded-md"
                    onClick={()=>setShowEditPopup(!showEditPopup)}
                    >
                    <HiX /> Close              
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
            <form onSubmit={handleEditCommentSubmit} className='space-y-3'>
                <Textarea
                    id='content'
                    value={formData?.content || ""}
                    onChange={(e)=>setFormData({...formData, [e.target.id]: e.target.value})}
                />
                <Button type='submit' className='w-full'> Edit </Button>
            </form>
            
          </div>
        </div>
      
    </div>
)}

export default EditCommentPopup

