import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext.jsx';
import { Assets } from '../assets/Assets.js';
import RelatedProducts from '../Components/RelatedProducts.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {

  const { productId } = useParams();
  const { products,currency,addToCart, cartItems, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // this might need to change due to the use of async and await
  const fetchProductData = async () =>
  {
    products.map((item) =>
    {
      if(item._id.toString() === productId)
      {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  const fetchReviews = async () =>
  {
    try
    {
      const response = await axios.get(`${backendUrl}/api/review/${productId}`);
      setReviews(response.data.reviews || []);
      setAvgRating(response.data.avgRating || 0);
      setTotalReviews(response.data.totalReviews || 0);
    }
    catch(error)
    {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() =>
  {
    fetchProductData();
    fetchReviews();
    window.scrollTo({top: 0, behavior: "smooth"}); // this is to smoothly scroll to the top of the window
  },[productId, products]);

  return productData ? (
  <>
  <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    {/* Product Data */}
    <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

      {/* Product Images */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item,index) =>
            (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img src={image} className='w-full h-auto' alt="" />
        </div>

        {/* <div className='w-full sm:w-[80%] relative'>
          {productData.oldPrice && productData.oldPrice > productData.price && (
            <div className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-md z-10'>
              SALE {Math.round(((productData.oldPrice - productData.price) / productData.oldPrice) * 100)}% OFF
            </div>
          )}
          <img src={image} className='w-full h-auto' alt="" />
        </div> */}
      </div>

      {/* Product Info */}

      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2 text-gray-600 '>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < Math.round(avgRating) ? Assets.star_icon : Assets.star_dull_icon}
              alt="star"
              className="w-4.5"
            />
          ))}
          <p className='pl-2 text-gray-700'>
            {avgRating > 0
              ? `${avgRating.toFixed(1)} / 5 (${totalReviews} review${totalReviews !== 1 ? "s" : ""})`
              : "No ratings yet"}
          </p>
        </div>
        <div className='mt-5 text-3xl font-medium flex items-center gap-4'>
        {productData.oldPrice && productData.oldPrice !== productData.price && (
          <>
            <span className='line-through text-gray-500 text-2xl'>
              {currency}{productData.oldPrice}
            </span>
          
            <span>{currency}{productData.price}</span>
            <span className='text-xs bg-green-600 text-white px-2 py-1 rounded'>
            SALE {Math.round(((productData.oldPrice - productData.price) / productData.oldPrice) * 100)}% OFF
            </span>
          </>
        )}
        {
          (!productData.oldPrice || productData.oldPrice === productData.price) && (
            <span className='text-black'>{currency}{productData.price}</span>
          )
        }
        </div>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {
              productData.sizes.map((item,index) =>
              (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-300 ${item === size ? "border-orange-500 dark:bg-green-500 dark:text-black" : "dark:bg-gray-700 dark:text-white"}`} key={index}>{item}</button>
              ))
            }
          </div>
        </div>
        <button onClick={() =>
          {
            if(!size)
            {
              toast.warn("Please select a size.");
              return;
            }
            if(productData.stock <= 0)
            {
              toast.error("This item is currently out of stock.");
              return;
            }

            const currentQty = cartItems[productData._id]?.[size] || 0;
            if(currentQty >= productData.stock)
            {
              toast.warn(`Only ${productData.stock} left in stock.`);
              return;
            }

            addToCart(productData._id, size);
            toast.success("Product Added to Cart");
          }
        }
        className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5 h-[1px] bg-gray-500 border-0' />
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product.</p>
          <p>Cash On Delivery Available On This Product.</p>
          <p>Easy Return And Exchange Policy Within 7 Days.</p>
        </div>
      </div>

    </div>

    {/* Description And Review Section */}

    <div className='mt-20'>
        <div className='flex'>
          <p 
            onClick={() => setActiveTab("description")}
            className={`border-2 border-gray-500 px-5 py-3 text-sm font-semibold cursor-pointer ${activeTab === "description" ? "bg-black text-white" : ""}`}
          >
            Description
          </p>
          <p 
            onClick={() => setActiveTab("reviews")}
            className={`border-2 border-gray-500 px-5 py-3 text-sm cursor-pointer ${activeTab === "reviews" ? "bg-black text-white" : ""}`}
          >
            Reviews ({reviews.length})
          </p>
        </div>

        {activeTab === "description" && (
          <div className='flex flex-col gap-4 border-2 border-gray-500 px-6 py-6 text-sm text-gray-500'>
            <p>{productData.description}</p>
            <p>Discover premium style and comfort with our carefully curated collection...</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="border-2 dark:bg-transparent border-gray-500 px-6 py-6 text-sm text-gray-600 bg-[#FCD8CD]">
          <p className="font-semibold text-lg mb-4">
            Average Rating: ⭐ {avgRating.toFixed(1)} / 5 ({totalReviews} reviews)
          </p>

            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border-b border-black pb-4 mb-4">
                  {/* Reviewer name and verification */}
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                    {review.verifiedPurchase && (
                      <span className="text-orange-500 text-xs font-semibold">Verified Purchase</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={i < review.rating ? Assets.star_icon : Assets.star_dull_icon}
                        alt="star"
                        className="w-3.5"
                      />
                    ))}
                  </div>

                  {/* Review date */}
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewed on {review.reviewedOn}
                  </p>

                  {/* Review title */}
                  {review?.title && (
                    <p className="font-semibold mt-2 text-gray-800">{review.title}</p>
                  )}

                  {/* Comment */}
                  <p className="mt-2 text-gray-700">{review.comment}</p>

                  {/* Images (optional) */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {review.images.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt="review"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No reviews yet for this product.</p>
            )}
          </div>
        )}
      </div>

    {/* Related Products */}

    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

  </div>
  </>
  ) : <div className='opacity-0 '></div>
}

export default Product