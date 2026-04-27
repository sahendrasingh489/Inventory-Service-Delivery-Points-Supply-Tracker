// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import DataTable from "../components/common/DataTable";
import { Plus } from "lucide-react";
import API from "../services/api";

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    supplier: "",
    status: "active",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };



  // 🧠 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




// ➕ ADD PRODUCT
const handleAddProduct = async () => {
  try {
    await API.post("/products", {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    setShowAddModal(false);
    setFormData({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      supplier: "",
      status: "active",
    });

    fetchProducts();
  } catch (err) {
    console.error("Add failed:", err);
  }
};





// 🔥 UPDATE PRODUCT (ALAG FUNCTION)
const handleUpdateProduct = async () => {
  try {
    await API.put(`/products/${editingProduct.id}`, {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    setShowAddModal(false);
    setEditingProduct(null);

    fetchProducts();
  } catch (err) {
    console.error("Update failed:", err);
  }
};

const handleEdit = (product) => {
  setEditingProduct(product);

  setFormData({
    name: product.name || "",
    sku: product.sku || "",
    category: product.category || "",
    price: Number(product.price) || 0,   // 🔥 FIX
    stock: Number(product.stock) || 0,   // 🔥 FIX
    supplier: product.supplier || "",
    status: product.status || "active",
  });

  setShowAddModal(true);
};



const handleDelete = async (product) => {
  if (window.confirm(`Delete ${product.name}?`)) {
    try {
      await API.delete(`/products/${product.id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
};




  const columns = [
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "supplier", label: "Supplier" },
  ];

  const getStatusBadge = (status) => {
    const map = {
      active: "bg-success",
      low_stock: "bg-warning",
      out_of_stock: "bg-danger",
    };
    return map[status] || "bg-secondary";
  };

  const renderStock = (row) => (
    <span className={`badge ${getStatusBadge(row.status)}`}>
      {row.stock}
    </span>
  );

  const renderPrice = (row) => (
    <span className="fw-bold text-dark">₹{row.price}</span>
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Products 📦</h2>
          <p className="text-muted mb-0">
            {products.length} products •{" "}
            {products.filter((p) => p.stock <= 20).length} low stock
          </p>
        </div>

        <button
          className="btn btn-primary rounded-pill px-4 shadow-sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} className="me-2" />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="card glass p-3">
        <DataTable
          columns={columns}
          data={products.map((p) => ({
            ...p,
            price: renderPrice(p),
            stock: renderStock(p),
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={["edit", "delete"]}
        />
      </div>

      {/* Modal */}
      {showAddModal && (
        <div
          className="modal show d-block fade-in"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content rounded-4">
              <div className="modal-header border-0">
                <h5 className="fw-bold">
                    {editingProduct ? "Edit Product" : "Add Product"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input name="sku" value={formData.sku} onChange={handleChange} className="form-control" placeholder="SKU" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input name="category" value={formData.category} onChange={handleChange} className="form-control" placeholder="Category" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" placeholder="Price" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form-control" placeholder="Stock" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input name="supplier" value={formData.supplier} onChange={handleChange} className="form-control" placeholder="Supplier" />
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>

                <button className="btn btn-primary rounded-pill px-4" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;