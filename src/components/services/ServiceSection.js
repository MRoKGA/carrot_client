import React from 'react';
import ServiceItem from './ServiceItem';

const ServicesSection = ({ title, items = [], onItemClick }) => {
  return (
    <div className="services-section">
      <div className="section-heading">{title}</div>
      <div className="grid">
        {items.map((it) => (
          <ServiceItem
            key={it.label}
            icon={it.icon}
            label={it.label}
            onClick={() => onItemClick?.(it)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
