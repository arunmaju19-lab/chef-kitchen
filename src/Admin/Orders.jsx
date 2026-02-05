import React from "react";
import { useOrders } from "../context/OrdersContext";

function Orders() {
  const { adminOrders } = useOrders();

  /* ================= DATE HELPERS ================= */
  const now = new Date();

  const isToday = (date) =>
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isThisMonth = (date) =>
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isThisYear = (date) =>
    date.getFullYear() === now.getFullYear();

  /* ================= REVENUE CALC ================= */
  const todayRevenue = adminOrders.reduce((sum, order) => {
    const d = new Date(order.createdAt);
    return isToday(d) ? sum + order.total : sum;
  }, 0);

  const monthRevenue = adminOrders.reduce((sum, order) => {
    const d = new Date(order.createdAt);
    return isThisMonth(d) ? sum + order.total : sum;
  }, 0);

  const yearRevenue = adminOrders.reduce((sum, order) => {
    const d = new Date(order.createdAt);
    return isThisYear(d) ? sum + order.total : sum;
  }, 0);

  return (
    <div className="p-6 text-white space-y-8">

      {/* ================= REVENUE SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TODAY */}
        <div className="bg-[#1f2433] border border-[#2a2f42] rounded-xl p-5">
          <p className="text-sm text-gray-400">Today Revenue</p>
          <h2 className="text-2xl font-bold text-green-400 mt-2">
            {todayRevenue.toFixed(2)} AED
          </h2>
        </div>

        {/* MONTH */}
        <div className="bg-[#1f2433] border border-[#2a2f42] rounded-xl p-5">
          <p className="text-sm text-gray-400">This Month</p>
          <h2 className="text-2xl font-bold text-orange-400 mt-2">
            {monthRevenue.toFixed(2)} AED
          </h2>
        </div>

        {/* YEAR */}
        <div className="bg-[#1f2433] border border-[#2a2f42] rounded-xl p-5">
          <p className="text-sm text-gray-400">This Year</p>
          <h2 className="text-2xl font-bold text-blue-400 mt-2">
            {yearRevenue.toFixed(2)} AED
          </h2>
        </div>
      </div>

      {/* ================= ORDERS TABLE ================= */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

        {adminOrders.length === 0 && (
          <p className="text-gray-400">No orders yet</p>
        )}

        {adminOrders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden">

              {/* TABLE HEAD */}
              <thead className="bg-[#2a2f42] text-sm text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-center">Order Type</th>
                  <th className="px-4 py-3 text-center">Payment</th>
                  <th className="px-4 py-3 text-right">Total (AED)</th>
                  <th className="px-4 py-3 text-right">Time</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="bg-[#1f2433] divide-y divide-[#2a2f42]">
                {adminOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#262b40]">

                    <td className="px-4 py-3 font-medium">
                      {order.customerName}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-400 max-w-xs">
                      {order.address}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <ul className="space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i}>
                            {item.name} ({item.size}) × {item.qty}
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="px-3 py-1 rounded-full text-xs bg-orange-500">
                        {order.orderType}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center text-sm">
                      {order.payment}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-green-400">
                      {order.total.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 text-right text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
