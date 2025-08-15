import React from 'react';
import { FiArrowLeft, FiTrash2, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotiHeader = () => {
  const nav = useNavigate();
  return (
    <div className="noti-top">
      <button className="icon-btn" onClick={() => nav(-1)}>
        <FiArrowLeft size={22} />
      </button>
      <div className="noti-title">알림</div>
      <div className="noti-actions">
        <FiTrash2 size={20} />
        <FiSettings size={20} style={{ marginLeft: 14 }} />
      </div>
    </div>
  );
};

export default NotiHeader;
