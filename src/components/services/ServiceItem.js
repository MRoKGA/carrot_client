import React from 'react';

const ServiceItem = ({ icon, label, onClick }) => {
  return (
    <button className="grid-item" type="button" onClick={onClick}>
      <span className="grid-icon">{icon}</span>
      <span className="grid-label">{label}</span>
    </button>
  );
};

export default ServiceItem;
