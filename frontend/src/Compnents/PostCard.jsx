import { Button } from 'flowbite-react';
import React from 'react';
import { HiBookmark, HiChat, HiHeart, HiSearch, HiShare, HiUserAdd } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { users } from '../dataSeeders/author50';
import DisplayContent from './DisplayContent';

const PostCard = ({ post }) => {
  //console.log("postcard", post)

  console.log(post);
  const navigate = useNavigate();
  return (   
      <div className=' w-full flex border flex-col p-2 rounded-lg object-contain cursor-pointer ' onClick={()=>navigate(`/posts/post/${post?._id}`)} >
        {/* <div className='flex justify-between'>
          <Link className='flex items-center gap-2'>
            <img className='h-8 rounded-full' src={author?.profilePic } alt="" />
            <p className='text-xs font-semibold'> {author?.username } </p>
          </Link>
          <Button outline pill> <HiUserAdd /> </Button>
        </div> */}
        <hr className='mt-2'/>
        <img className='max-h-52 w-full flex justify-center items-center' src={(post?.thumbnail?.length > 0 && post.thumbnail.at(-1)) || "https://images.squarespace-cdn.com/content/v1/57263bf8f8baf385ff61bb09/1535668320137-NZQPOXCGLFT34I9E4Z1E/Screen+Shot+2018-08-30+at+6.17.10+PM.png"} alt="" />
        <div>
          {post?.aiGenerated && <span className='bg-red-700 text-white font-semibold rounded-lg px-1'> Test Post</span>}
          <p className='font-semibold md:text-sm font-serif mt-1'> {post?.title?.length > 50 ? post.title.substring(0, 50)+"..." : post.title} </p>
          <div className='text-sm'> <DisplayContent content = {post?.content?.length > 70 ? post.content.substr(0,70)+" read more ...." : post?.content} /> <Link className='text-blue-400'> ...read more</Link>  </div>
        </div>
        
        {/* <div className='flex justify-between items-center mt-5 px-3'>  
          <div className='flex items-center gap-3'>
            <span className='hover:text-white'> <HiHeart /> </span>
            <span className='hover:text-white'> <HiChat /> </span>
            <span className='hover:text-white'> <HiShare /> </span>            

          </div>
          <div>
            <span className='hover:text-gray-100'> <HiBookmark /> </span>
          </div>
        </div> */}

      </div>
      
  );
};

export default PostCard;
