import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext.jsx";
import Title from '../Components/Title.jsx'
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const { backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleImageChange = (e) =>
  {
    const file = e.target.files[0];
    setImage(file);
    if(file)
    {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle profile update
  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if(!name && !image)
    {
      toast.error("Please enter a name or upload an image");
      return;
    }

    setLoading(true);

    try
    {
      const formData = new FormData();
      if(name) formData.append("name", name);
      if(image) formData.append("image", image);

      const res = await axios.post(`${backendUrl}/api/user/edit-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      if(res.data.success)
      {
        toast.success("Profile updated successfully!");
      }
      else
      {
        toast.error(res.data.message || "Error updating profile");
      }
    }
    catch(error)
    {
      console.error(error);
      toast.error("Something went wrong while updating your profile");
    }
    finally
    {
      setLoading(false);
    }
  };

  const handleClick = () =>
  {
    navigate("/profile"); // 👈 change route as needed
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#F5E8DF]">
      <div className='text-3xl text-center mb-10'>
        <Title text1={"EDIT"} text2={"PROFILE"} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FCD8CD] shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h2>

        {/* Image Preview */}
        <div className="flex justify-center mb-4">
          <label htmlFor="image" className="cursor-pointer relative">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full border-2 border-gray-300 text-gray-500">
                Upload
              </div>
            )}
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border-none bg-gray-300 placeholder-black"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          onClick={handleClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;