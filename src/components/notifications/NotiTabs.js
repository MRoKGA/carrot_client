import React from 'react';

const NotiTabs = ({ value, onChange }) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${value === 'activity' ? 'active' : ''}`}
        onClick={() => onChange('activity')}
      >
        활동
      </button>
      <button
        className={`tab ${value === 'new' ? 'active' : ''}`}
        onClick={() => onChange('new')}
      >
        새 글
      </button>
    </div>
  );
};

export default NotiTabs;
