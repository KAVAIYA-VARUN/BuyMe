import { createContext, useEffect, useState } from "react";
import { Products } from "../assets/Assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

// context is use to access the data and the function in any other components

const ShopContextProvider = (props) =>
{

    const currency = "₹";
    const delivery_fee = 20;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async(itemId, size) =>
    {
        if(!size)
        {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);
        // structuredClone will make the copy of the cart items

        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1;
            }
            else
            {
                cartData[itemId][size] = 1;
            }
        }
        else
        {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () =>
    {
        let totalCount = 0;
        for(const items in cartItems) // this loop will iterate the products
        {
            for(const item in cartItems[items]) // this loop will select the size
            {
                try
                {
                    if(cartItems[items][item])
                    {
                        totalCount += cartItems[items][item];
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) =>
    {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () =>
    {
        let totalAmount = 0;
        for(const items in cartItems)
        {
            let itemInfo = Products.find((product) => product._id.toString() === items);
            for(const item in cartItems[items])
            {
                try
                {
                    if(cartItems[items][item] > 0)
                    {
                        totalAmount += itemInfo.price * cartItems[items][item];
                        // note : here cartItems[items][item] is the quantity
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const value =
    {
        Products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount,
        navigate
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;