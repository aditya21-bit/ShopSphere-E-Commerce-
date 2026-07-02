import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });

      toast.success("Order Updated");

      fetchOrders();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4">Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {order._id.slice(-6)}
                </td>

                <td>
                  {order.user}
                </td>

                <td>
                  ₹{order.totalAmount}
                </td>

                <td>
                  {order.status}
                </td>

                <td>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg p-2"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
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

export default ManageOrders;