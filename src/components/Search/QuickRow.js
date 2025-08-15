import React from 'react';

const QuickRow = ({ items = [], onClick }) => {
  return (
    <div className="quick-row">
      {items.map(({ icon, label }) => (
        <button
          key={label}
          className="quick-chip"
          type="button"
          onClick={() => onClick?.(label)}
        >
          <div className="quick-icon">{icon}</div>
          <div className="quick-text">{label}</div>
        </button>
      ))}
    </div>
  );
};

export default QuickRow;
