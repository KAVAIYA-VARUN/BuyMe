import React from 'react'

const OrderConfirmation = () => {
  return (
    <>
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

        {/* Top Info */}
        <div className="grid grid-cols-3 text-sm text-gray-600 mb-4 border-b pb-4">
          <div>
            <p className="font-semibold text-gray-800">Date</p>
            <p>02 May 2023</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Order Number</p>
            <p>024-125478956</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Payment Method</p>
            <p>Mastercard</p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4 border-b pb-4">
          {/* Item 1 */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <img
                src="https://via.placeholder.com/80"
                alt="All In One Chocolate Combo"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  All In One Chocolate Combo
                </p>
                <p className="text-xs text-gray-500">Pack: Medium</p>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">$50.00</p>
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <img
                src="https://via.placeholder.com/80"
                alt="Desire Of Hearts"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">Desire Of Hearts</p>
                <p className="text-xs text-gray-500">Pack: Large</p>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">$50.00</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-sm text-gray-700 mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>$100.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$2.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$5.00</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between mt-5 text-lg font-bold text-gray-900">
          <span>Order Total</span>
          <span>$107.00</span>
        </div>
      </div>
    </>
  )
}

export default OrderConfirmation