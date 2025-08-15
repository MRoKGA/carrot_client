import React from 'react';
import { CiClock2 } from 'react-icons/ci';

const RecentList = ({ items = [], onRemove, onClear }) => {
  return (
    <div className="section">
      <div className="section-title">
        최근 검색
        {items.length > 0 && (
          <button className="clear-btn" onClick={onClear}>전체 삭제</button>
        )}
      </div>

      <ul className="recent-list">
        {items.map((kw) => (
          <li key={kw} className="recent-item">
            <span className="clock"><CiClock2 /></span>
            <span className="kw">{kw}</span>
            <button className="del" onClick={() => onRemove?.(kw)}>✕</button>
          </li>
        ))}
        {items.length === 0 && <li className="empty">최근 검색어가 없습니다.</li>}
      </ul>
    </div>
  );
};

export default RecentList;
