import express from 'express'
import app from './backend/src/app.js';
import dotenv from 'dotenv'
import { databaseConnection } from './backend/src/Databases/mongodb.connection.js';

dotenv.config({path: './.env'})

databaseConnection().then((connectionInstance)=>{
    const port = process.env.PORT;
    console.log(`mongodb connection has been established at`, connectionInstance.connection.host)
    app.listen(port, ()=>{
        console.log(`server is up and live on ${port}`)
    })
})