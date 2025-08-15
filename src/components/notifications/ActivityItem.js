import React from 'react';
import { AiOutlineMore } from 'react-icons/ai';

const ActivityItem = ({ item }) => {
  return (
    <div className="activity-item">
      <div className="left">
        <div className="icon-circle" style={{ background: item.iconBg }}>
          <span className="emoji">{item.iconEmoji}</span>
        </div>
      </div>

      <div className="center">
        <div className="meta">
          <span className="source">소식</span>
          <span className="time">{item.time}</span>
        </div>
        <div className="title">{item.title}</div>

        <button className="more-link">
          {item.moreCount}건 더보기
        </button>
      </div>

      <div className="right">
        {item.thumb && <img className="thumb" src={item.thumb} alt="" />}
        <button className="more-btn">
          <AiOutlineMore size={18} />
        </button>
      </div>
    </div>
  );
};

export default ActivityItem;
