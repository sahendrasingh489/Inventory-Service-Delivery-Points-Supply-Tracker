import React from "react";

const PurchaseOrders = () => {
  const orders = [
    { id: 1, product: "Rice 5kg", qty: 100, status: "Pending" },
    { id: 2, product: "Oil 5L", qty: 50, status: "Completed" },
  ];

  return (
    <div>
      <h2 className="mb-4">Purchase Orders</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.product}</td>
              <td>{o.qty}</td>
              <td>
                <span className={o.status === "Completed" ? "text-success" : "text-warning"}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrders;