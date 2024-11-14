export const comments = [
    {
      _id: "1",
      author: { _id: "a1", username: "JohnDoe" },
      content: "This is the first comment.",
      likesCount: 2,
      replies: [
        {
          _id: "2",
          author: { _id: "a2", username: "JaneDoe" },
          content: "This is a reply to the first comment.",
          likesCount: 1,
        },
        {
          _id: "3",
          author: { _id: "a3", username: "User123" },
          content: "Another reply to the first comment.",
          likesCount: 1,
        },
      ],
    },
    {
      _id: "4",
      author: { _id: "a4", username: "AnotherUser" },
      content: "This is the second comment.",
      likesCount: 1,
      replies: [],
    },
  ];