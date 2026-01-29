import React from 'react'

function Orders() {
   return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>

        {/* Add Order Button */}
        <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
          Add Order
        </button>
      </div>

      {/* Page content */}
      <div>
        {/* products table / cards will come here */}
      </div>
    </div>
  );
}

export default Orders
