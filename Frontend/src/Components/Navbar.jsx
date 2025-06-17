import React,{ useContext, useState } from "react";
import { Assets } from "../assets/Assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch, getCartCount} = useContext(ShopContext);

  return (
   <>
   <div className="flex items-center justify-between p-0 font-medium">

    <Link to="/"><img src={Assets.BUYMELOGO4} className="w-40" alt="About " /></Link>

    <ul className="hidden sm:flex gap-5 text-l text-gray-700">

        <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contactus" className="flex flex-col items-center gap-1">
            <p>CONTACT_US</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

    </ul>

     <div className="flex items-center gap-6">

        <img onClick={() => setShowSearch(true)} src={Assets.search_icon} className="w-5 cursor-pointer" alt="" />

        <div className="group relative">
            <Link to="/login"><img src={Assets.profile_icon} className="w-5 cursor-pointer" alt="" /></Link>
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-600 rounded-xl">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <Link to="/myOrders"><p className="cursor-pointer hover:text-black">My Orders</p></Link>
                    <p className="cursor-pointer hover:text-black">Logout</p>
                </div>
            </div>
        </div>

        <Link to="/cart" className="relative">

        <img src={Assets.cart_icon} className="w-5 min-w-5" alt="" />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">{getCartCount()}</p>

        </Link>

        <div>
            <img src={Assets.mode_change_icon} className="w-7 cursor-pointer" alt="" />
        </div>

        <img onClick={() => {setVisible(true)}} src={Assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />

    </div>

    {/* Sidebar menu for small screens */}

    <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-700">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                <img src={Assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border " to="/" >HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border " to="/collection" >COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border " to="/contactus" >CONTACTUS</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border " to="/about" >ABOUT</NavLink>
        </div>
    </div>

   </div>
   </>
  )
}

export default Navbar