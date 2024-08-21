import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'flowbite-react';

const LandingPage = ({recentPosts, popularPosts}) => {
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const recentRes = await axios.get('/api/posts/recent');
        const popularRes = await axios.get('/api/posts/popular');
  
        // Extract the data array from the response
        if (Array.isArray(recentRes.data.data)) {
          setRecentPosts(recentRes.data.data);
        } else {
          console.error('Expected recent posts to be an array');
        }
  
        if (Array.isArray(popularRes.data.data)) {
          setPopularPosts(popularRes.data.data);
        } else {
          console.error('Expected popular posts to be an array');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Our Blog</h1>
      
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts && recentPosts?.map(post => (
            <Card key={post._id} className="shadow-lg">
              <img
                src={post.thumbnail.length > 0 ? post.thumbnail[0] : 'https://via.placeholder.com/300'}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
                <Button className="mt-4" href={`/posts/${post._id}`}>Read More</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6">Most Popular Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPosts && popularPosts?.map(post => (
            <Card key={post._id} className="shadow-lg">
              <img
                src={post.thumbnail.length > 0 ? post.thumbnail[0] : 'https://via.placeholder.com/300'}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
                <Button className="mt-4" href={`/posts/${post._id}`}>Read More</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
