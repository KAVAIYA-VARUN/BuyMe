import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext.jsx';

const Review = () => 
{
  const { backendUrl, token } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // product passed from MyOrders (via navigate state)
  const product = location.state?.product;

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch user name once on mount
  useEffect(() =>
  {
    const fetchUserName = async () =>
    {
      try
      {
        if (!token)
        {
          toast.error('Please login to write a review');
          navigate('/login');
          return;
        }

        const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token: token }
        });

        // your controller returns user object directly
        if (data && data.name)
        {
          setName(data.name);
        }
      }
      catch (err)
      {
        console.error('Error fetching user name:', err);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [token, backendUrl, navigate]);

  if (!product)
  {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-600 text-lg">No product data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (loading)
  {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading user details...
      </div>
    );
  }

  const handlePhotoChange = (e) =>
  {
    setPhoto(e.target.files[0]);
  };

  const handleStarClick = (value) =>
  {
    setRating(value);
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if (!name.trim())
    {
      toast.error('Your name is required');
      return;
    }

    if (!rating || rating < 1)
    {
      toast.error('Please select a rating (1-5 stars)');
      return;
    }

    if (!comment.trim())
    {
      toast.error('Please write a comment');
      return;
    }

    try
    {
      const formData = new FormData();
      // product id: try product.product (from order item) else _id
      const productId = product.product || product._id || product.id;
      formData.append('productId', productId);
      formData.append('title', title);
      formData.append('comment', comment);
      formData.append('name', name);
      formData.append('rating', rating);
      if (photo) formData.append('photo', photo);

      const { data } = await axios.post(`${backendUrl}/api/review/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token")
        }
      });

      if (data.success)
      {
        toast.success('Review submitted successfully');
        navigate('/myorders');
      }
      else
      {
        toast.error(data.message || 'Failed to submit review');
      }
    }
    catch (err)
    {
      console.error('Error submitting review:', err);
      toast.error('Error submitting review');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-[#FCD8CD] shadow-lg rounded-lg">
      {/* Product display */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={product.image?.[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md border"
        />
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">Write your review below</p>
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Review Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-none rounded-md p-2 bg-gray-300"
        />

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="border-none bg-gray-300 rounded-md p-2"
        />

        {/* Star rating */}
        <div>
          <label className="block mb-2 text-sm font-medium text-black">Rating</label>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleStarClick(s)}
                className={`text-2xl ${rating >= s ? 'text-yellow-400' : 'text-gray-500'}`}
                aria-label={`${s} star`}
              >
                ★
              </button>
            ))}
            <span className="text-sm text-black ml-3">{rating ? `${rating} / 5` : 'No rating'}</span>
          </div>
        </div>

        {/* Prefilled and disabled user name */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          disabled
          className="border-none rounded-md p-2 bg-gray-300 text-black cursor-not-allowed"
        />

        <label className="block text-sm font-medium text-black">Add Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border-none rounded-md p-2"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;