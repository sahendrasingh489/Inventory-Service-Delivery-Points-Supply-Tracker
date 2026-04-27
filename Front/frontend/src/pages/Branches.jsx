// src/pages/Branches.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Users, DollarSign } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

const Branches = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  // 🔥 FETCH BRANCHES
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await API.get("/branches");
      setBranches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ➕ ADD
  const handleAddBranch = async () => {
    try {
      await API.post("/branches", formData);
      toast.success("Branch added");
      setShowModal(false);
      setFormData({ name: "", location: "" });
      fetchBranches();
    } catch {
      toast.error("Error adding branch");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete this branch?")) {
      await API.delete(`/branches/${id}`);
      toast.success("Deleted");
      setSelectedBranch(null);
      fetchBranches();
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <MapPin size={18} /> },
    { id: "staff", label: "Staff", icon: <Users size={18} /> },
    { id: "performance", label: "Performance", icon: <DollarSign size={18} /> },
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Branches 🏢</h2>
          <p className="text-muted">Manage all branch locations</p>
        </div>

        <button
          className="btn btn-primary rounded-pill px-4 shadow-sm"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} className="me-2" />
          Add Branch
        </button>
      </div>

      <div className="container-fluid">
        <div className="row g-4 w-100">
          
          {/* LEFT PANEL */}
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="card glass p-4 h-100">

              <h5 className="fw-bold mb-3">Select Branch</h5>

              <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                {branches.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 border rounded mb-2 cursor-pointer"
                    onClick={() => setSelectedBranch(b)}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{b.name}</strong>
                    <div className="text-muted">{b.location}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-lg-7 col-md-6">
            {!selectedBranch ? (
              <div className="card glass p-5 text-center">
                <h4 className="fw-bold text-muted">
                  Select a branch to view details
                </h4>
              </div>
            ) : (
              <>
                {/* Branch Info */}
                <div className="card glass p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h4 className="fw-bold">{selectedBranch.name}</h4>
                      <p className="text-muted">{selectedBranch.location}</p>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(selectedBranch.id)}
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>
                </div>

                {/* Tabs */}
                <div className="card glass">
                  <div className="d-flex gap-2 p-3 flex-wrap">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`btn ${
                          activeTab === tab.id
                            ? "btn-primary"
                            : "btn-light"
                        } rounded-pill`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.icon} <span className="ms-1">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-4">
                    {activeTab === "overview" && (
                      <div className="text-center">
                        <h5>Branch Overview</h5>
                        <p className="text-muted">
                          Future me yaha analytics aayega 😎
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* 🔥 ADD MODAL */}
      {showModal && (
        <div className="modal d-block" style={{ background: "#00000088" }}>
          <div className="modal-dialog">
            <div className="modal-content p-4">

              <h5>Add Branch</h5>

              <input
                className="form-control mb-2"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <button className="btn btn-primary" onClick={handleAddBranch}>
                Save
              </button>

              <button
                className="btn btn-secondary mt-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;