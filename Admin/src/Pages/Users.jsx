import React from 'react'
import { backendUrl } from '../App.jsx'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import { useEffect } from 'react';

const Users = () => {

  const [userData, setUserData] = useState([]);

  const fetchUser = async () =>
  {
    try
    {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${backendUrl}/api/user/allusers`, {headers: { token }});

        if(response.data.success)
        {
            setUserData(response.data.users);
        }
        else
        {
            toast.error(response.data.message);
        }
    }
    catch(error)
    {
        console.log(error.message);
        toast.error(error.message);
    }
  }

  useEffect(() =>
  {
    fetchUser();
  },[]);

  return (
    <>
        <p className='mb-2'>ALL USERS LIST</p>
        <div className='flex flex-col gap-2'>
            <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-400 text-black text-sm'>
                <b>Name</b>
                <b>Email</b>
                <b>Phone</b>
                <b>Address</b>
            </div>

            {userData.length > 0 ? (
          userData.map((user, index) => (
            <div
              className='grid grid-cols-3 md:grid-cols-[1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm border-gray-400'
              key={index}
            >
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone || "N/A"}</p>
              <p>
                {Array.isArray(user.address)
                    ? user.address.map((addr, i) => (
                        <span key={i} className='flex'>
                        {addr.street}, {addr.city}, {addr.state} {addr.pincode}
                        </span>
                    ))
                    : user.address || "N/A"}
                </p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-sm mt-2'>No users found.</p>
        )}
        </div>
    </>
  )
}

export default Users