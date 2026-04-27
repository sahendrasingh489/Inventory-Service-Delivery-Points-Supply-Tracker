// src/components/inventory/BranchSelector.jsx
import React, { useState } from 'react';

const branches = [
  { id: 1, name: 'Main Branch - Delhi', location: 'Delhi', status: 'active', manager: 'Rahul Sharma' },
  { id: 2, name: 'Branch 2 - Mumbai', location: 'Mumbai', status: 'active', manager: 'Priya Patel' },
  { id: 3, name: 'Branch 3 - Bangalore', location: 'Bangalore', status: 'inactive', manager: 'Amit Kumar' },
];

const BranchSelector = ({ onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white border-bottom pb-0">
        <h6 className="card-title mb-2 fw-semibold">Select Branch</h6>
        <div className="input-group input-group-sm">
          <span className="input-group-text"><i className="fas fa-search"></i></span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search branches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush" style={{maxHeight: '300px', overflowY: 'auto'}}>
          {filteredBranches.map(branch => (
            <button 
              key={branch.id}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 py-3 border-0 ${
                branch.status === 'inactive' ? 'text-muted' : ''
              }`}
              onClick={() => onSelect(branch)}
            >
              <div>
                <div className="fw-semibold">{branch.name}</div>
                <small className="text-muted">{branch.location} • {branch.manager}</small>
              </div>
              <span className={`badge ${
                branch.status === 'active' ? 'bg-success' : 'bg-secondary'
              }`}>
                {branch.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchSelector;