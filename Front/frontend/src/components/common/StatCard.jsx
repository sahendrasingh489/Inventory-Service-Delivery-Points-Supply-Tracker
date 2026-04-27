// src/components/common/StatCard.jsx
import React from 'react';

const StatCard = ({ icon, title, value, color = 'primary', trend = '+12%' }) => {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info'
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`flex-shrink-0 ${colors[color]} bg-gradient rounded-circle p-3`}>
            {icon}
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="fw-bold">{value}</h3>
            <small className={`text-${color === 'primary' ? 'success' : color}`}>
              {trend} from last month
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;