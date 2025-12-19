import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";

const Orders = ({token}) =>
{
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchAllOrders = async () =>
    {
        if(!token)
        {
            return null;
        }

        try
        {
            const response = await axios.post(`${backendUrl}/api/order/list`, {}, {headers: {token}});
            if(response.data.success)
            {
                setOrders(response.data.orders.reverse());
            }
            else
            {
                toast.error(response.data.message);
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

    const statusHandler = async (e, orderId) =>
    {
        try
        {
            const response = await axios.post(`${backendUrl}/api/order/status`,
                {orderId, status:e.target.value},
                {headers: {token}}
            );

            if(response.data.success)
            {
                await fetchAllOrders();
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

    const fetchAllProducts = async () =>
    {
        try
        {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if(res.data?.products)
            {
                setProducts(res.data.products);
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getNoteForProduct = (productId) =>
    {
        const product = products.find((p) => p._id === productId);
        if(!product)
        {
            console.warn(`No product found for ID: ${productId}`);
            return "-";
        }
        return product?.note || "-";
    }

    useEffect(() =>
    {
        fetchAllOrders();
        fetchAllProducts();
    },[token]);

    return (
        <>
            <div>
                <h3 className='font-semibold text-black'>Order Page</h3>
                <div>
                    {orders.map((order, index) =>
                    (
                        <div className='grid grid-cols-1 sm:grid-cols-[1.5fr_2fr_1fr] lg:grid-cols-[1.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-600 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                            
                            {/* IMAGE + PRODUCT DETAILS */}
                            <div className="flex flex-col gap-4">
                                {order.items.map((item, idx) =>
                                {
                                    const note = getNoteForProduct(item._id);
                                    return (
                                        <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                                            <img
                                                src={item.image[0]}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-gray-800 font-semibold">{note}</p>
                                                <p className="text-gray-700">{item.name} x {item.quantity} <span>{item.size}</span></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* ADDRESS */}
                            <div>
                                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div>
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
                                </div>
                                <p>{order.address.phone}</p>
                            </div>

                            {/* ORDER INFO */}
                            <div>
                                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                                <p className='mt-3'>Method : {order.paymentMethod}</p>
                                <p>Payment : {order.payment ? "DONE" : "PENDING"}</p>
                                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                            </div>

                            {/* AMOUNT */}
                            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>

                            {/* STATUS */}
                            {order.status === "Cancelled" ?
                                <span className="p-2 font-semibold text-red-500">Cancelled</span>
                            :
                                <select
                                    onChange={(e) => statusHandler(e, order._id)}
                                    value={order.status}
                                    className="p-2 font-semibold"
                                >
                                    {["Order Placed", "Packing", "Shipped", "Out For Delivery", "Delivered"].map((statusOption, index) =>
                                    {
                                        const currentIndex = ["Order Placed", "Packing", "Shipped", "Out For Delivery", "Delivered"].indexOf(order.status);
                                        return (
                                            <option
                                                key={statusOption}
                                                value={statusOption}
                                                disabled={index < currentIndex || index > currentIndex + 1}
                                            >
                                                {statusOption}
                                            </option>
                                        )
                                    })}
                                </select>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Orders