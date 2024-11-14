import mongoose from "mongoose";
import Book from "../Models/book.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import User from "../Models/user.model.js";

export const createBook = asyncHandler(async (req, res, next)=>{
    const { userId } = req.params;
  
    const { title, content, category, frontPage } = req.body;
    try {
        const createdBook = await Book.create({
            title,
            content,
            category,
            frontPage,
            author: userId,
        });
        if(!createdBook){
            throw new apiError(404, "Failed to create book")
        }
        console.log("book creation successfull", createdBook)
        return res.status(201)
            .json(new apiResponse(201, "Book created", createdBook))
    } catch (error) {
        console.log("error", error)
        next(error)
    }   

})

export const getBooksOfUser = asyncHandler(async (req, res, next)=>{
    try {
        const { userId } = req.params;
        const books = await Book.find({
            author: userId
        })
        .populate("author");
        
        return res.status(200)
            .json(new apiResponse(200, "Authors book fetched", books))
    } catch (error) {
        next(error)
    }
})