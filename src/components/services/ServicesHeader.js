import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ServicesHeader = ({ title = '전체 서비스' }) => {
  const nav = useNavigate();
  return (
    <div className="services-top">
      <button className="icon-btn" onClick={() => nav(-1)}>
        <FiArrowLeft size={22} />
      </button>
      <div className="services-title">{title}</div>
      <div className="services-right" />{/* 자리 맞춤 */}
    </div>
  );
};

export default ServicesHeader;
