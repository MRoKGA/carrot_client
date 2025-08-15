import React from 'react';
import '../../css/Home.css';

const CategoryChips = ({ categories, selected, onSelect }) => {
  return (
    <div className="chip-row">
      {['전체', ...categories].map(cat => (
        <button
          key={cat}
          className={`chip ${selected === cat ? 'chip--active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
