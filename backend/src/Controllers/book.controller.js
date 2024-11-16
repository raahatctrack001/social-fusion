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
        const { page = 1 } = req.query; 
        const books = await Book.find({
            author: userId
        })
        .skip((page-1)*8)
        .limit(8)
        .sort({createdAt: -1})
        .populate("author");
        
        return res.status(200)
            .json(new apiResponse(200, "Authors book fetched", books))
    } catch (error) {
        next(error)
    }
})

export const updateBook = asyncHandler(async (req, res, next)=>{
    const { userId, bookId } = req.params;
    
    try {
        const updatedBook = await Book.findById(bookId);
        if(updatedBook?.author != userId){
            throw new apiError(404, "Book not found to update")
        }

        const bookUpdated = await Book.findByIdAndUpdate(bookId, req.body, {new: true});
        if(!bookUpdated){
            throw new apiError(401, "failed to add summary")
        }
        return res.status(200)
            .json(new apiResponse(200, "summary has been added", bookUpdated))
    } catch (error) {
        next(error);
    }
})

export const getBook = asyncHandler(async (req, res, next)=>{
    try {
        const { bookId } = req.params;
        console.log(bookId)
        if(!bookId){
            throw new apiError(404, "bookId doesn't found!")
        }

        const getBook = await Book.findById(bookId);
        console.log(getBook)
        if(!getBook){
            throw new apiError(404, "Book not found")
        }

        return res.status(200)
            .json(new apiResponse(200, "Book fetched", getBook))
    } catch (error) {
        next(error)
    }
})

export const publishBook = asyncHandler(async (req, res, next)=>{
    const { bookId, userId } = req.params;
    try {
        const { isOpenSource, bookType, price } = req.body;
        if(req.user?._id != userId){
            throw new apiError(403, "you can only publish your own book")
        }

        const publishedBook = await Book.findByIdAndUpdate(bookId, {
            $set: {
                isOpenSource,
                bookType,
                price,
                publishedDate: new Date(),
                status: "PUBLISHED",
            }
        }, {new: true})


        console.log(publishedBook)
        if(!publishedBook){
            throw new apiError(401, "Failed to publish book")
        }
        return res.status(201).json(new apiResponse(201, "Book Published and live now on sale", publishedBook));
    } catch (error) {
        next(error)
    }
}

)

export const getPublishedBookOfAuthor = asyncHandler(async (req, res, next)=>{
   try {
        const { userId } = req.params;
        const { page = 1} = req.query;

        if(req.user?._id != userId){
            throw new apiError(403, "Unauthorized attempt")
        }

        const publishedBooks = await Book.find({
            status: "PUBLISHED",
            author: userId,
            isHidden: false,
        })
        .skip((page-1)*9)
        .limit(9)
        .sort({createdAt: -1})

        if(!publishedBooks){
            throw new apiError(404, "failed to fetched published books")
        }

        return res.status(200)
            .json(new apiResponse(200, "fetched published posts", publishedBooks))
   } catch (error) {
        next(error)    
   }
})

export const getAllPublishedBooks = asyncHandler(async (req, res, next)=>{
    try {
        const books = await Book.find({
            status: "PUBLISHED"
        })
        .populate("author")
        if(!books){
            throw new apiError(404, "No book published yet")
        }

        return res.status(200)
            .json(new apiResponse(200, "books fetched", books))
    } catch (error) {
        next(error);
    }
})