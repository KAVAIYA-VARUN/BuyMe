import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async(e) =>
  {
    e.preventDefault();
  }

  return (
    <>
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800 mt-0'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {
        currentState === "Login" ? "" : <input type="text" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Name' required/>
      }
      <input type="email" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Email Address' required/>
      <input type="password" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-blue-800'>Forgot Your Password?</p>
        {
          currentState === "Login"
          ? <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer font-semibold text-orange-800'>Create Account</p>
          : <p onClick={() => setCurrentState("Login")} className='cursor-pointer font-semibold text-orange-800'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-semibold px-8 py-2 mt-4'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
    </>
  )
}

export default Login