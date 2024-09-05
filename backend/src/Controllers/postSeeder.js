import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../DataSeeders/author50';

const categories = [
  "Technology",
  "Health",
  "Science",
  "Lifestyle",
  "Education",
  "Travel",
  "Food",
  "Entertainment",
  "Finance",
  "Sports",
  "Environment",
  "History",
  "Art",
  "Politics",
  "Business",
  "Music",
  "Gaming",
  "Relationships",
  "Self Improvement",
  "Fashion"
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function generatePost() {
  return {
    title: `Post Title ${uuidv4()}`,
    content: `In the rapidly evolving field of technology, staying informed is crucial. The latest advancements in artificial intelligence and machine learning are revolutionizing various industries. From healthcare to finance, AI technologies are enhancing efficiency and providing new solutions to complex problems. One of the most exciting developments is the use of AI for predictive analytics. By analyzing large datasets, AI algorithms can forecast trends and behaviors, allowing businesses to make data-driven decisions. Moreover, AI-powered automation is streamlining processes, reducing human error, and saving time. As these technologies continue to advance, they promise to bring even more transformative changes to our world. Understanding these trends and their implications is essential for anyone looking to stay ahead in today's tech-driven society. As we look to the future, the potential applications of AI seem boundless, making it an exciting area to watch.`,
    thumbnail: ["https://cdn.pixabay.com/photo/2019/04/29/13/20/post-it-4166054_1280.png"],
    author: getRandomElement(users),
    comments: [],
    enableComments: true,
    likes: [],
    shares: [],
    category: getRandomElement(categories),
    imagesURLs: [],
    videoURLs: [],
    status: "Published",
    aiGenrated: true
  };
}

const posts = Array.from({ length: 500 }, generatePost);

writeFileSync('posts.json', JSON.stringify(posts, null, 2));
console.log('500 posts generated and saved to posts.json');
