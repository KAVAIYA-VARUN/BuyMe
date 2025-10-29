import reviewModel from "../Models/reviewModel.js";
import productModel from "../Models/productModel.js";
import cloudinary from "cloudinary";

const createReview = async (req, res) =>
{
    try
    {
        const { productId, rating, comment, userId } = req.body;
        let imageLinks = [];

        if(!productId || !rating)
        {
            return res.status(400).json({message: "ProductId and rating are required"});
        }

        if(req.files && req.files.length > 0)
        {
            for(let file of req.files)
            {
                const result = await cloudinary.v2.uploader.upload(file.path, {folder: "buyme/reviews"});

                imageLinks.push(
                    {
                        public_id: result.public_id,
                        url: result.secure_url
                    }
                );
            }
        }
        
        // might need to change the name of the variable that is review

        const reviewData =
        {
            product: productId,
            user: userId,
            rating,
            comment,
            images: imageLinks
        }

        console.log(reviewData);

        const review = new reviewModel(reviewData);
        await review.save();

        const reviews = await reviewModel.find({ product: productId });
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        await productModel.findByIdAndUpdate(productId, { rating: avgRating.toFixed(1), numReviews: reviews.length });

        res.status(201).json(
        {
            success: true,
            message: "Review added successfully",
            review
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error while writing the review"});
    }
}

const getProductReview = async (req, res) =>
{
    try
    {
        const { productId } = req.params;

        const reviews = await reviewModel.find({product: productId}).populate("user", "name email").sort({createdAt: -1});

        res.json({success: true, reviews});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success: false, message: "Error while fetching the review"});
    }
}

const deleteReview = async (req, res) =>
{
    try
    {
        const { reviewId } = req.params;

        const review = await reviewModel.findById(reviewId);
        if(!review)
        {
            return res.status(404).json({message: "Review not found"});
        }

        if(review.images && review.images.length > 0)
        {
            for(let img of review.images)
            {
                await cloudinary.v2.uploader.destroy(img.public_id);
            }
        }

        await review.deleteOne();

        res.json(
        {
            success: true,
            message: "Review deleted successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success: false, message: "Error while deleting the review"});
    }
}

export { createReview, getProductReview, deleteReview }