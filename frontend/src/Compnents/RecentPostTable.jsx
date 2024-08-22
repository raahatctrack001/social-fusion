import { Button, Table } from 'flowbite-react';
import { formatDistanceToNow } from 'date-fns'; // Correct import
import DisplayContent from './DisplayContent';
import { Link, useNavigate } from 'react-router-dom';

const RecentPostsTable = ({heading, displayPosts }) => {
    const navigate = useNavigate();
  return (
    <div className=" p-6 rounded-lg dark:bg-[rgb(16,23,42)] border-2 border-white shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{heading}</h3>
      <Table className=''>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Updated At</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {displayPosts && displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <Table.Row key={post._id} className=''>
                <Table.Cell className=' dark:text-blue-300 text-blue-500 cursor-pointer' onClick={()=>{navigate(`/posts/post/${post?._id}`)}}>{post?.title}</Table.Cell>
                <Table.Cell className=' dark:text-blue-300 text-blue-500 cursor-pointer' onClick={()=>{navigate(`/posts/post/${post?._id}`)}}>
                    <DisplayContent content=   {post?.content.length > 50 ? `${post?.content.slice(0, 50)}...` : post?.content} />
                </Table.Cell>
                <Table.Cell className=' dark:text-blue-300 text-blue-500 cursor-pointer text-nowrap' onClick={()=>navigate(`/authors/author/${post?.author?._id}`)}>{post?.author?.fullName?.length > 10 ? post?.author?.fullName.substr(0, 6)+"...": post?.author?.fullName}</Table.Cell>
                {/* <Table.Cell> <Link className='text-blue-700'>Read More...</Link> </Table.Cell> */}
                <Table.Cell className=''>{formatDistanceToNow(new Date(post?.updatedAt), { addSuffix: true })}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="4" className="text-center">No recent posts available.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RecentPostsTable;
