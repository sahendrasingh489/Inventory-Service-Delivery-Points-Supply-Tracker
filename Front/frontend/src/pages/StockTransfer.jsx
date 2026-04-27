import React from "react";

const StockTransfer = () => {
  return (
    <div>
      <h2 className="mb-4">Stock Transfer</h2>

      <div className="card p-4" style={{ maxWidth: "500px" }}>
        <input className="form-control mb-3" placeholder="Product Name" />
        <input className="form-control mb-3" placeholder="From Branch" />
        <input className="form-control mb-3" placeholder="To Branch" />
        <input className="form-control mb-3" placeholder="Quantity" />

        <button className="btn btn-primary w-100">
          Transfer Stock
        </button>
      </div>
    </div>
  );
};

export default StockTransfer;