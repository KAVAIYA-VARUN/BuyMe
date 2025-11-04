import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
{
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },

    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    rating:
    {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title:
    {
        type: String,
    },
    comment:
    {
        type: String,
        trim: true
    },

    images:
    [{
        public_id: String,
        url: String
    }],

},
{ timestamps: true }
);

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;