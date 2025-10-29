import express from "express";
import { createReview, getProductReview, deleteReview } from "../Controllers/reviewControllers.js";
import upload from "../Middleware/multer.js";
import authUser from "../Middleware/auth.js";

const reviewRouter = express.Router();

// Create a new review (only for logged-in users)
reviewRouter.post("/create", upload.array("photo"), authUser, createReview);

// Get all reviews for a specific product (public)
reviewRouter.get("/:productId", getProductReview);

// Delete a specific review (only for logged-in users)
reviewRouter.delete("/:reviewId", authUser, deleteReview);

export default reviewRouter;