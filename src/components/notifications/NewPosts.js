import React from 'react';

const NewPosts = ({ chips, selectedChip, onSelectChip }) => {
  return (
    <div className="new-posts">
      <div className="chip-row">
        {chips.map((c) => (
          <button
            key={c}
            className={`chip ${selectedChip === c ? 'chip--active' : ''}`}
            onClick={() => onSelectChip(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="empty-state">
        <div className="empty-title">중고거래 알림을 등록해 보세요</div>
        <div className="empty-sub">조건에 맞는 알림을 받아볼 수 있어요.</div>
        <button className="primary-btn">🔔 알림 등록하기</button>
      </div>
    </div>
  );
};

export default NewPosts;
