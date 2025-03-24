import PostAtHome from './PostAtHome'
import UserAtHome from '../Compnents/UserAtHome';


const Home = () => {
  return (
    //post section
    <div className='min-h-screen flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
      {/* <SuggestedHomePost /> */}
      
      <PostAtHome />        
      <UserAtHome />
    </div>
  );
};


export default Home