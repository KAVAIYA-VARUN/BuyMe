// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import Title from '../Components/Title';
// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';
// import axios, { all } from 'axios';

// const MyOrders = () => {

//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   const loadOrderData = async () =>
//   {
//     try
//     {
//       if(!token)
//       {
//         return null;
//       }

//       const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {headers: {token}});
//       if(response.data.success)
//       {
//         let allOrdersItem = [];
//         response.data.orders.map((order) =>
//         {
//           order.items.map((item) =>
//           {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrdersItem.push(item);
//           })
//         })
//         setOrderData(allOrdersItem.reverse());
//       }
//     }
//     catch(error)
//     {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }

//   useEffect(() =>
//   {
//     loadOrderData();
//   },[token]);

//   return (
//     <>
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={"MY"} text2={"ORDERS"} />
//       </div>
//       <div>
//         {
//           orderData.map((item,index) =>
//           (
//             <div key={index} className='py-4 border-t border-gray-500 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//               <div className='flex items-start gap-6 text-sm'>
//                 <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
//                     <p>{currency}{item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>
//                   <p className='mt-1'>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
//                   <p className='mt-1'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
//                 </div>
//               </div>
//               <div className='md:w-1/2 flex justify-between'>
//               <div className='flex items-center gap-2'>
//                 <p className='min-w-2 h-2 rounded-full bg-green-600'></p>
//                 <p className='text-sm md:text-base'>{item.status}</p>
//               </div>
//               <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm bg-gray-300 text-black'>Track Order</button>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//     </>
//   )
// }

// export default MyOrders

import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item.order_id = order._id;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const cancelOrder = async () => {
    try {
      if (!token || !selectedOrderId) return;

      const response = await axios.post(
        `${backendUrl}/api/order/cancel-order`,
        { orderId: selectedOrderId },
        { headers: { token } }
      );

      if(response.data.success)
      {
        toast.success(response.data.message || "Order cancelled successfully");
        loadOrderData(); // reload updated data
      }
      else
      {
        toast.error(response.data.message || "Unable to cancel order");
      }

      setModalOpen(false);
      setSelectedOrderId(null);
    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
      setModalOpen(false);
      setSelectedOrderId(null);
    }
  }

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  }

  const closeCancelModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* Orders list */}
      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-gray-500 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-600'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>

              <div className='flex gap-3'>
                {item.status !== "Cancelled" && item.status !== "Delivered" &&
                  <button
                    onClick={loadOrderData}
                    className='border px-4 py-2 text-sm font-medium rounded-sm bg-gray-300 text-black'>
                    Track Order
                  </button>
                }

                {item.status !== "Delivered" && item.status !== "Cancelled" ? (
                  <button
                    onClick={() => openCancelModal(item.order_id)}
                    className="border px-4 py-2 text-sm font-medium rounded-sm bg-red-800 text-white"
                  >
                    Cancel Order
                  </button>
                ) : item.status === "Cancelled" ? (
                  <button
                    className="border px-4 py-2 text-sm font-medium rounded-sm bg-gray-500 text-white cursor-not-allowed"
                    disabled
                  >
                    Cancelled
                  </button>
                ) : null}

                {item.status === "Delivered" && (
                  <button
                    onClick={() => navigate(`/write-review`, { state: { product: item } })}
                    className="border px-4 py-2 text-sm font-medium rounded-sm bg-gray-300 text-black"
                  >
                    Write Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Order Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#FCD8CD] border-none p-6 w-80 md:w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cancel Order</h2>
            <p className="mb-6">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 rounded-md border-none bg-gray-300 text-black"
              >
                No
              </button>
              <button
                onClick={cancelOrder}
                className="px-4 py-2 border-none rounded-md bg-red-800 text-white"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyOrders;