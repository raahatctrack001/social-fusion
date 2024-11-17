import Book from "../Models/book.model.js";
import Contribution from "../Models/contribution.model.js";
import contribution from "../Models/contribution.model.js";
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const startContribution = asyncHandler(async (req, res, next)=>{
    try {
        const { authorId, bookId, contributorId } = req.params;
      
        const author = await User.findById(authorId);
        if(!author){
            throw new apiError(404, "Author desn' exist")
        }

        const book = await Book.findById(bookId);
        if(!book){
            throw new apiError(404, "book doesn't exist")
        }

        const isExisting = await Contribution.find({
            author: author?._id,
            documentType: "BOOK",
            documentId: book?._id,
            contributor: contributorId,
        })
        
        if(isExisting.length !== 0){
            console.log("exists");
            return res.status(200)
                .json(new apiResponse(200, "contribution already exists", {details: isExisting, book}))
        }
        const contributionDetail = await Contribution.create({
            author: author?._id,
            documentType: "BOOK",
            documentId: book?._id,
            contributor: contributorId,
            originalData: {
                title: book?.title,
                content: book?.content,
                summary: book?.summary,
            }
        })
        
        if(!contributionDetail){
            throw new apiError(500, "Failed to create contribution space")
        }
        return res.status(201)
            .json(new apiResponse(201, "Contribution space has been craeted", {details: [contributionDetail], book}))

    } catch (error) {
        next(error)
    }

})

export const getContributedBook = asyncHandler(async (req, res, next)=>{
    try {        
        const { userId } = req.params;
        console.log()
        const contributedBooks = await Contribution.find({
            contributor: userId
        })
        .populate('documentId');

        // const books = await Promise.all(
        //     contributedBooks.map(book=>Book.findById(book?.documentId))
        // )

        // console.log("books", books)
        // console.log(contributedBooks)
        if(!contributedBooks){
            throw new apiError(404, "No contribution found")
        }

        return res.status(200)
            .json( new apiResponse(200, "contributed books fetched", contributedBooks));
    } catch (error) {
        next(error)
    }
})