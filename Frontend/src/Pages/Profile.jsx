import React from 'react'
import { Link } from 'react-router-dom'
import { User, Package, LogOut, Settings } from 'lucide-react'
import Title from '../Components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'

const Profile = () => {

  const [user,setUser] = useState(null);
  const { backendUrl, token, setCartItems, setToken, navigate } = useContext(ShopContext);

  const logout = () =>
  {
      navigate("/login");
      localStorage.removeItem("token");
      setToken("");
      setCartItems({});
  }

  const fetchUser = async () =>
  {
    try
    {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {headers: {token}});
      setUser(response.data);
    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() =>
  {
    if(token)
    {
      fetchUser();
    }
  },[token]);

  if(!user)
  {
    return(
      <div className="min-h-screen flex justify-center items-center bg-[#F5E8DF] dark:bg-gray-900 text-xl font-semibold text-gray-800 dark:text-white">
        Loading your profile...
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-[#F5E8DF] dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='text-3xl text-center mb-10'>
          <Title text1={"MY"} text2={"PROFILE"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-[#FCD8CD] rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <nav className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 rounded-lg"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/myOrders"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                >
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                </Link>
                <button
                  className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span onClick={logout} >Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Profile Content */}
          <div className="md:col-span-2">
            <div className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <Settings className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member Since
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/myOrders"
                className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      My Orders
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Track your orders
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                to="/"
                className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                    <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Continue Shopping
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Explore products
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile