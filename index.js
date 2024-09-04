import express from 'express'
import app from './backend/src/app.js';
import dotenv from 'dotenv'
import { databaseConnection } from './backend/src/Databases/mongodb.connection.js';
import { Server } from 'socket.io';
import { socketController } from './backend/src/Socket/SocketServer.js';

dotenv.config({path: './.env'})

databaseConnection()
    .then((connectionInstance)=>{
        const port = process.env.PORT;
        console.log(`mongodb connection has been established at`, connectionInstance.connection.host)
        const server = app.listen(port, ()=>{
            console.log(`server is up and live on ${port}`)
        })
        // const socketServer = new Server(server, { //instead of io, i used socketServer
        //     pingTimeout: 60000, 
        //     cors: {
        //         origin: process.env.FRONTEND_URL
        //     },
        // });

        const socketServer = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: process.env.FRONTEND_URL,  // Ensure this matches your frontend URL
            },
        });
        
        socketServer.on("connection", (socket) => {
            console.log("Socket.io connection has been established.");
            socketController(socket, socketServer);
            // socket.on("hello", (arg, callback) => {
            //     console.log(arg); // Should log "world"
            //     callback("got it");
            // });
        
            // socket.emit("rmsg", "Server says hello!");
        });
    })
    .catch((error)=>{
        console.log("trying to connect database", error);
        setTimeout(() => {
            databaseConnection();
            
        }, 5000);
    })