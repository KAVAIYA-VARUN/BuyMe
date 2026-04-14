import React, { useContext, useState, useEffect } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { Assets } from '../assets/Assets'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () =>
{
    const [method, setMethod] = useState("cod");
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState(
    {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
    });

    const [modalOpen, setModalOpen] = useState(false); // modal state
    const [pendingOrderData, setPendingOrderData] = useState(null); // order data for modal confirmation

    const hasOutOfStock = Object.keys(cartItems).some(productId =>
    {
        const product = products.find(p => p._id === productId);
        return product && product.stock <= 0;
    });

    const onChangeHandler = (e) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({...data,[name]: value}));
    }

    // Click handler for Place Order
    const handlePlaceOrderClick = async (e) =>
    {
        e.preventDefault();

        let orderItems = [];
        for(const items in cartItems)
        {
            for(const item in cartItems[items])
            {
                if(cartItems[items][item])
                {
                    const itemInfo = structuredClone(products.find(product => product._id === items));
                    if(itemInfo)
                    {
                        itemInfo.size = item;
                        itemInfo.quantity = cartItems[items][item];

                        if(itemInfo.stock <= 0)
                        {
                            toast.error(`${itemInfo.name} is out of stock.`);
                            return;
                        }

                        orderItems.push(itemInfo);
                    }
                }
            }
        }

        const orderData =
        {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee
        }

        setPendingOrderData(orderData);
        setModalOpen(true);
    }

    // Confirm order from modal
    const confirmPlaceOrder = async () =>
    {
        setModalOpen(false);
        if(!pendingOrderData) return;

        try
        {
            switch(method)
            {
                case 'cod':
                {
                    const response = await axios.post(`${backendUrl}/api/order/place`, pendingOrderData, {headers: {token}});
                    if(response.data.success)
                    {
                        setCartItems({});
                        navigate("/myorders");
                    }
                    else
                    {
                        toast.error(response.data.message);
                    }
                    break;
                }

                case 'stripe':
                {
                    const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, pendingOrderData, {headers: {token}});
                    if(responseStripe.data.success)
                    {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    }
                    else
                    {
                        toast.error(responseStripe.data.message);
                    }
                    break;
                }

                default:
                    break;
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

    const closeModal = () =>
    {
        setModalOpen(false);
        setPendingOrderData(null);
    }

    useEffect(() =>
    {
        const fetchUserAddress = async () =>
        {
            try
            {
                const res = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
                const user = res.data;
                if(user)
                {
                    const selectedIndex = Number(localStorage.getItem("selectedAddressIndex")) || -1;
                    if(!user.address || user.address.length === 0)
                    {
                        toast.warn("Please add an address before placing an order.");
                        navigate("/address");
                        return;
                    }

                    const selectedAddress = user.address[selectedIndex] || user.address[0];
                    const nameParts = user.name.split(" ");

                    setFormData(prev => ({
                        ...prev,
                        firstName: nameParts[0] || "",
                        lastName: nameParts.slice(1).join(" ") || "",
                        street: selectedAddress.street || "",
                        city: selectedAddress.city || "",
                        state: selectedAddress.state || "",
                        pincode: selectedAddress.pincode || "",
                        country: selectedAddress.country || "",
                        email: user.email || "",
                        phone: user.phone?.toString() || ""
                    }));
                }
            }
            catch(err)
            {
                console.log(err);
            }
        }

        if(token) fetchUserAddress();
    }, [token]);

    return (
        <>
        <form onSubmit={handlePlaceOrderClick} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side - ADDRESS FORM */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                    <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                </div>
                <input required onChange={onChangeHandler} name="email" value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                    <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="pincode" value={formData.pincode} type="number" placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                    <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
                </div>
                <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
            </div>

            {/* Right Side - PAYMENT & PLACE ORDER */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 p-2 px-3 cursor-pointer border-2 border-gray-500'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-600" : ""}`}></p>
                            <img src={Assets.stripe_logo} className='h-5 mx-4' alt="" />
                        </div>
                        {/* <div onClick={() => setMethod("razorpay")} className='flex items-center gap-3 p-2 px-3 cursor-pointer border-2 border-gray-500'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-600" : ""}`}></p>
                            <img src={Assets.razorpay_logo} className='h-5 mx-4' alt="" />
                        </div> */}
                        <div onClick={() => setMethod("cod")} className='flex items-center gap-3 p-2 px-3 cursor-pointer border-2 border-gray-500'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-600" : ""}`}></p>
                            <p className='text-gray-500 text:sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    {hasOutOfStock && (
                    <p className="text-red-600 text-sm mt-4">
                        ⚠️ One or more items in your cart are out of stock.
                    </p>
                    )}
                    <div className='w-full text-end mt-8'>
                        <button type='submit' disabled={hasOutOfStock} className='bg-black dark:hover:bg-green-600 text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>

        {/* Modal */}
        {modalOpen &&
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
                  <div className="bg-[#FCD8CD] dark:bg-gray-600 p-6 w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
                      <h2 className='text-xl font-semibold mb-3'>Confirm Your Order</h2>
                      <p className='mb-4 text-gray-700'>⚠️ Once the order is placed, you cannot cancel it after it is shipped.</p>

                      {/* Order Summary */}
                      {pendingOrderData && (
                          <>
                              <div className='border-t border-b border-black py-3 mb-4'>
                                  {pendingOrderData.items.map((item, index) => (
                                      <div key={index} className='flex justify-between items-center mb-2'>
                                          <div className='flex items-center gap-3'>
                                              <img src={item.image[0]} alt={item.name} className='w-12 h-12 object-cover rounded' />
                                              <div>
                                                  <p className='font-medium'>{item.name}</p>
                                                  <p className='text-sm text-gray-500'>Qty: {item.quantity} | Size: {item.size}</p>
                                              </div>
                                          </div>
                                          <p className='font-semibold'>₹{item.price * item.quantity}</p>
                                      </div>
                                  ))}
                              </div>

                              {/* Delivery Address */}
                              <div className='py-3 mb-4'>
                                  <h3 className='font-medium mb-2'>Delivery Address</h3>
                                  <p>{pendingOrderData.address.firstName} {pendingOrderData.address.lastName}</p>
                                  <p>{pendingOrderData.address.street}</p>
                                  <p>{pendingOrderData.address.city}, {pendingOrderData.address.state}, {pendingOrderData.address.country} - {pendingOrderData.address.pincode}</p>
                                  <p>Phone: {pendingOrderData.address.phone}</p>
                              </div>

                              {/* Total */}
                              <div className='flex flex-col gap-2 font-semibold text-lg'>
                                  <div className='flex justify-between'>
                                      <p className='font-bold text-2xl'>Tax:</p>
                                      <p className='font-bold text-2xl'>₹{delivery_fee}</p>
                                  </div>
                                  <div className='flex justify-between'>
                                      <p className='font-bold text-2xl'>Total Amount:</p>
                                      <p className='font-bold text-2xl'>₹{pendingOrderData.amount}</p>
                                  </div>
                              </div>
                          </>
                      )}

                      {/* Modal Buttons */}
                      <div className='flex justify-end gap-3 mt-6'>
                          <button onClick={closeModal} className='px-4 py-2 border rounded dark:hover:bg-red-500 text-gray-700 bg-gray-200'>Cancel</button>
                          <button onClick={confirmPlaceOrder} className='px-4 py-2 border dark:hover:bg-green-600 rounded bg-green-600 text-white'>Confirm</button>
                      </div>
                  </div>
              </div>
          }
        </>
    )
}

export default PlaceOrder