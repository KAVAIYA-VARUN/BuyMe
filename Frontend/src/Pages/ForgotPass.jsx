import React from 'react'
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../Context/ShopContext.jsx';
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPass = () => {

    const navigate = useNavigate();
    const inputRefs = React.useRef([]);
    const { backendUrl } = useContext(ShopContext);
    axios.defaults.withCredentials = true;

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isEmailSent, setIsEmailSent] = useState("");
    const [otp, setOtp] = useState(0);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

    const handlePaste = (e) =>
  {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    
    pasteArray.forEach((char, index) =>
    {
      if(inputRefs.current[index])
      {
        inputRefs.current[index].value = char;
      }
    })
  }

  const handleKeyDown = (e, index) =>
  {
    if(e.key === "Backspace" && e.target.value === "" && index > 0)
    {
      inputRefs.current[index - 1].focus();
    }
  }

  const handleInput = (e, index) =>
  {
    if(e.target.value.length > 0 && inputRefs.current.length - 1)
    {
      inputRefs.current[index + 1].focus();
    }
  }

  const onSubmitEmail = async (e) =>
  {
    e.preventDefault();

    try
    {
      const { data } = await axios.post(`${backendUrl}/api/user/send-reset-otp`, {email});

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    }
    catch(error)
    {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async (e) =>
  {
    e.preventDefault();

    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) =>
  {
    e.preventDefault();

    try
    {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {email, otp, newPassword});
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    }
    catch(error)
    {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <>
    <div  className="flex items-center justify-center bg-[#F5E8DF]">

    {/* enter email id */}

    { !isEmailSent &&
      <form onSubmit={onSubmitEmail} className='bg-transparent p-8 rounded-lg w-96 text-sm'>
        <h1 className='text-black text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p  className='text-center mb-6 text-gray-900'>Enter your registered email address.</p>

        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-gray-300'>
          <input
          value={email}
          onChange={(e) => setEmail(e.target.value)} required className='bg-transparent outline-none text-black placeholder-black' type="email" placeholder='Email id' />
        </div>
        
        <button className='w-full mt-3 py-3 bg-black text-white'>Submit</button>
      </form>
    }

      {/* otp input form */}

    { !isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitOtp} className='bg-transparent p-8 w-96 text-sm'>
        <h1 className='text-black text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p  className='text-center mb-6 text-gray-900'>Enter the 6-digit code sent to your email id.</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) =>
          (
            <input className='w-12 h-12 bg-gray-400 text-white text-center text-xl' ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e,index)} type="text" maxLength='1'key={index} required />
          ))}
        </div>

        <button className='w-full py-2.5 bg-black text-white'>Submit</button>
      </form>
    }

      {/* enter new password */}

    { isOtpSubmitted && isEmailSent &&

      <form onSubmit={onSubmitNewPassword} className='bg-transparent p-8 w-96 text-sm'>
        <h1 className='text-black text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p  className='text-center mb-6 text-gray-900'>Enter the new password below.</p>

        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-gray-400'>
          <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} required className='bg-transparent outline-none text-black' type="password" placeholder='Password' />
        </div>
        
        <button className='w-full mt-3 py-3 bg-black text-white'>Submit</button>
      </form>
    }
    </div>
    </>
  )
}

export default ForgotPass