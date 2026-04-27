// src/components/common/DataTable.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Edit3, 
  Trash2, 
  Eye 
} from 'lucide-react';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView, 
  searchPlaceholder = "Search...",
  showFilters = true,
  actions = ['view', 'edit', 'delete']
}) => {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-bottom pb-0">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h6 className="card-title mb-2 fw-semibold">Products List</h6>
            <small className="text-muted">{sortedData.length} products found</small>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light sticky-top">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="position-relative"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort(column.key)}
                >
                  {column.label}
                  <ChevronDown 
                    size={14} 
                    className={`ms-1 position-absolute end-0 top-50 translate-middle-y ${
                      sortColumn === column.key 
                        ? sortDirection === 'asc' ? 'text-primary' : 'text-primary rotate-180' 
                        : 'text-muted opacity-50'
                    }`} 
                  />
                </th>
              ))}
              {actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={row.id || index} className="align-middle">
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                {actions.length > 0 && (
                  <td>
                    <div className="btn-group btn-group-sm" role="group">
                      {actions.includes('view') && (
                        <button className="btn btn-outline-info" title="View">
                          <Eye size={14} />
                        </button>
                      )}
                      {actions.includes('edit') && (
                        <button 
                          className="btn btn-outline-primary" 
                          title="Edit"
                          onClick={() => onEdit?.(row)}
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                      {actions.includes('delete') && (
                        <button 
                          className="btn btn-outline-danger" 
                          title="Delete"
                          onClick={() => onDelete?.(row)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
        <div className="card-body text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3 opacity-50"></i>
          <h5 className="text-muted">No products found</h5>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;