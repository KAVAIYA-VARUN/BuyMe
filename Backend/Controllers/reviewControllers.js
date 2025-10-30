import reviewModel from "../Models/reviewModel.js";
import productModel from "../Models/productModel.js";
import orderModel from "../Models/orderModel.js";
import cloudinary from "cloudinary";

const createReview = async (req, res) =>
{
    try
    {
        const { productId, rating, comment, userId } = req.body;
        console.log("Review Data: ", req.body);

        const numericRating = Number(rating);

        if(isNaN(numericRating))
        {
            return res.json({
                success: false,
                message: "Invalid rating value."
            });
        }

        if(!productId || !rating)
        {
            return res.json({ message: "ProductId and rating are required" });
        }

        const existingReview = await reviewModel.findOne({productId, userId});
        if(existingReview)
        {
            return res.json({success: false, message: "You had already reviewed the product"});
        }

        const deliveredOrder = await orderModel.find({ userId: userId, status: "Delivered" });

        const hasProduct = deliveredOrder.some(order =>
            Array.isArray(order.items) &&
            order.items.some(item =>
                (item._id && item._id.toString() === productId.toString()) ||
                (item.product && (item.product.toString ? item.product.toString() : item.product) === productId.toString())
            )
        );

        if(!hasProduct)
        {
            return res.status(403).json({
                success: false,
                message: "You can only review products after delivery."
            });
        }

        let imageLinks = [];

        if(req.files && req.files.length > 0)
        {
            for(const file of req.files)
            {
                const result = await cloudinary.v2.uploader.upload(file.path, { folder: "buyme/reviews" });

                imageLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
        }

        const reviewData =
        {
            productId,
            userId,
            rating: numericRating,
            comment,
            images: imageLinks
        };

        console.log("Final Review Data: ", reviewData);

        const review = new reviewModel(reviewData);
        await review.save();

        const reviews = await reviewModel.find({ productId });

        const avgRating = reviews.length > 0
            ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1))
            : 0;

        await productModel.findByIdAndUpdate(productId,
        {
            rating: avgRating,
            numReviews: reviews.length
        });

        res.status(201).json(
        {
            success: true,
            message: "Review added successfully",
            review
        });
    }
    catch(error)
    {
        console.log("Error adding review:", error);
        res.json({ success: false, message: error.message });
    }
};


const getProductReview = async (req, res) =>
{
  try
  {
    const { productId } = req.params;
    const { userId } = req.query;

    if(!productId)
    {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const filter = { productId };
    if(userId) filter.userId = userId;

    const reviews = await reviewModel.find({productId})
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

    const formattedReviews = reviews.map(review => ({
      reviewerName: review.userId?.name || "Anonymous",
      verifiedPurchase: true,
      rating: review.rating,
      reviewedOn: review.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
      comment: review.comment,
      images: review.images?.map(img => img.url),
    }));

    let avgRating = 0;
    if(reviews.length > 0)
    {
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        avgRating = total / reviews.length;
    }

    res.json({ success: true, reviews: formattedReviews, avgRating, totalReviews: reviews.length });
  }
  catch(error)
  {
    console.log(error);
    res.json({ success: false, message: "Error while fetching the review" });
  }
};


const deleteReview = async (req, res) =>
{
    try
    {
        const { reviewId } = req.params;

        const review = await reviewModel.findById(reviewId);
        if(!review)
        {
            return res.status(404).json({ message: "Review not found" });
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
        res.json({ success: false, message: "Error while deleting the review" });
    }
};

export { createReview, getProductReview, deleteReview };