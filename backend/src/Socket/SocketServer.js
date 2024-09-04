export const socketController = async (socket, socketServer)=>{
    // Join room with user's ID
    let onlineUsers = [];
    socket.on('join room', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${socket.id}`);

        if(onlineUsers.some(user=>user?._id === userId)) return;
        onlineUsers.push({userId, socketId: socket.id});
        console.log(onlineUsers);\
    });


    //recieve and send message
    socket.on("send message", (data) => {
        let conversation = data.conversation;
        if (conversation.participants.length === 0) return;
    
        conversation.participants.forEach((user) => {
            if (user._id === data.message.sender._id) return;
            // Emit to all sockets in the room identified by user._id
            socketServer.to(user._id).emit("receive message", data);
        });
    });

     // Disconnect event
     socket.on('disconnect', () => {
        
        console.log(`User disconnected: ${socket.id}`);
    });    
}