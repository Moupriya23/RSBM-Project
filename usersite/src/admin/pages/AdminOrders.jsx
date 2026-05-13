import { useAdmin } from "../AdminContext";

const statusColor = {
  Pending: "bg-orange-500/20 text-orange-400",
  Shipped: "bg-blue-500/20 text-blue-400",
  Delivered: "bg-green-500/20 text-green-400",
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-8">Orders</h1>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-700/50">
            <tr>
              {[
                "#",
                "Customer",
                "Product",
                "Price",
                "Date",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-gray-400 font-semibold px-5 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-5 py-3 text-gray-500">{o.id}</td>
                <td className="px-5 py-3 text-white font-medium">
                  {o.customer}
                </td>
                <td className="px-5 py-3 text-gray-400">{o.product}</td>
                <td className="px-5 py-3 text-amber-400 font-bold">
                  {o.price}
                </td>
                <td className="px-5 py-3 text-gray-400">{o.date}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[o.status]}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-400"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
