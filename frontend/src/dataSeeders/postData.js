const posts = [
    {
      title: 'Understanding React',
      content: 'React is a JavaScript library for building user interfaces. Learn how to build a component-based architecture and manage state effectively.',
      tags: ['React', 'JavaScript', 'Web Development'],
      author: {
        name: 'Jane Smith',
        username: '@janesmith',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg'
      }
    },
    {
      title: 'Getting Started with Vue',
      content: 'Vue.js is a progressive framework for building user interfaces. It is designed from the ground up to be incrementally adoptable.',
      tags: ['Vue', 'JavaScript', 'Frontend'],
      author: {
        name: 'Michael Johnson',
        username: '@michaeljohnson',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
    },
    {
      title: 'Mastering Angular',
      content: 'Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces.',
      tags: ['Angular', 'TypeScript', 'Web Development'],
      author: {
        name: 'Emily Davis',
        username: '@emilydavis',
        photo: 'https://randomuser.me/api/portraits/women/2.jpg'
      }
    },
    {
      title: 'Exploring Svelte',
      content: 'Svelte is a radical new approach to building user interfaces. Learn how to build reactive applications with less code.',
      tags: ['Svelte', 'JavaScript', 'Frontend'],
      author: {
        name: 'David Wilson',
        username: '@davidwilson',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    },
    {
      title: 'Introduction to Next.js',
      content: 'Next.js is a minimalistic framework for server-rendered React applications. Learn the basics and get started with your first Next.js app.',
      tags: ['Next.js', 'React', 'SSR'],
      author: {
        name: 'Sophia Martinez',
        username: '@sophiamartinez',
        photo: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    },
    {
      title: 'Building APIs with Express',
      content: 'Express is a minimal and flexible Node.js web application framework. Learn how to build robust and scalable APIs with Express.',
      tags: ['Express', 'Node.js', 'Backend'],
      author: {
        name: 'James Anderson',
        username: '@jamesanderson',
        photo: 'https://randomuser.me/api/portraits/men/3.jpg'
      }
    },
    {
      title: 'Deploying with Docker',
      content: 'Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.',
      tags: ['Docker', 'DevOps', 'Containers'],
      author: {
        name: 'Olivia Brown',
        username: '@oliviabrown',
        photo: 'https://randomuser.me/api/portraits/women/4.jpg'
      }
    },
    {
      title: 'Kubernetes for Beginners',
      content: 'Kubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management.',
      tags: ['Kubernetes', 'DevOps', 'Containers'],
      author: {
        name: 'Christopher Lee',
        username: '@christopherlee',
        photo: 'https://randomuser.me/api/portraits/men/4.jpg'
      }
    },
    {
      title: 'Learning GraphQL',
      content: 'GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.',
      tags: ['GraphQL', 'API', 'Web Development'],
      author: {
        name: 'Amelia Taylor',
        username: '@ameliataylor',
        photo: 'https://randomuser.me/api/portraits/women/5.jpg'
      }
    },
    {
      title: 'Understanding TypeScript',
      content: 'TypeScript is a strict syntactical superset of JavaScript and adds optional static typing to the language.',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      author: {
        name: 'Daniel Harris',
        username: '@danielharris',
        photo: 'https://randomuser.me/api/portraits/men/5.jpg'
      }
    },
    {
      title: 'Introduction to Rust',
      content: 'Rust is a multi-paradigm system programming language focused on safety, especially safe concurrency.',
      tags: ['Rust', 'Programming', 'Systems'],
      author: {
        name: 'Sophia Miller',
        username: '@sophiamiller',
        photo: 'https://randomuser.me/api/portraits/women/6.jpg'
      }
    },
    {
      title: 'Building Mobile Apps with Flutter',
      content: 'Flutter is an open-source UI software development kit created by Google. It is used to develop cross platform applications.',
      tags: ['Flutter', 'Mobile', 'Dart'],
      author: {
        name: 'James Brown',
        username: '@jamesbrown',
        photo: 'https://randomuser.me/api/portraits/men/6.jpg'
      }
    },
    {
      title: 'Data Science with Python',
      content: 'Python is a programming language that lets you work quickly and integrate systems more effectively. Learn how to use Python for data science.',
      tags: ['Python', 'Data Science', 'Programming'],
      author: {
        name: 'Emily Wilson',
        username: '@emilywilson',
        photo: 'https://randomuser.me/api/portraits/women/7.jpg'
      }
    },
    {
      title: 'Machine Learning with TensorFlow',
      content: 'TensorFlow is an end-to-end open source platform for machine learning. Learn how to build and deploy machine learning models.',
      tags: ['TensorFlow', 'Machine Learning', 'AI'],
      author: {
        name: 'David Martinez',
        username: '@davidmartinez',
        photo: 'https://randomuser.me/api/portraits/men/7.jpg'
      }
    },
    {
      title: 'Introduction to Blockchain',
      content: 'Blockchain is a decentralized, distributed, and oftentimes public, digital ledger. Learn the basics and how it is used in the real world.',
      tags: ['Blockchain', 'Cryptocurrency', 'Technology'],
      author: {
        name: 'Sophia Anderson',
        username: '@sophiaanderson',
        photo: 'https://randomuser.me/api/portraits/women/8.jpg'
      }
    },
    {
      title: 'Cybersecurity Essentials',
      content: 'Cybersecurity involves protecting systems, networks, and programs from digital attacks. Learn the essentials and best practices.',
      tags: ['Cybersecurity', 'Security', 'Technology'],
      author: {
        name: 'Michael Taylor',
        username: '@michaeltaylor',
        photo: 'https://randomuser.me/api/portraits/men/8.jpg'
      }
    },
    {
      title: 'Cloud Computing with AWS',
      content: 'AWS offers reliable, scalable, and inexpensive cloud computing services. Learn how to use AWS for your applications.',
      tags: ['AWS', 'Cloud Computing', 'DevOps'],
      author: {
        name: 'Emily Brown',
        username: '@emilybrown',
        photo: 'https://randomuser.me/api/portraits/women/9.jpg'
      }
    },
    {
      title: 'DevOps Practices and Tools',
      content: 'DevOps is a set of practices that combines software development and IT operations. Learn the essential practices and tools.',
      tags: ['DevOps', 'CI/CD', 'Automation'],
      author: {
        name: 'David Smith',
        username: '@davidsmith',
        photo: 'https://randomuser.me/api/portraits/men/9.jpg'
      }
    },
    {
      title: 'Introduction to SQL',
      content: 'SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system.',
      tags: ['SQL', 'Database', 'Programming'],
      author: {
        name: 'Sophia Johnson',
        username: '@sophiajohnson',
        photo: 'https://randomuser.me/api/portraits/women/10.jpg'
      }
    },
    {
      title: 'Building RESTful APIs',
      content: 'A RESTful API is an application program interface that uses HTTP requests to GET, PUT, POST and DELETE data. Learn how to build one.',
      tags: ['API', 'REST', 'Web Development'],
      author: {
        name: 'Michael Anderson',
        username: '@michaelanderson',
        photo: 'https://randomuser.me/api/portraits/men/10.jpg'
      }
    }
  ];
  export default posts;