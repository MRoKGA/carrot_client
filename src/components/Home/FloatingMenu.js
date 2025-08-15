// components/Home/FloatingMenu.jsx
import React from 'react';
import '../../css/FloatingMenu.css';
import { FaSearch, FaHome, FaCar, FaBuilding, FaStore, FaBoxOpen, FaShoppingBag } from 'react-icons/fa';

const FloatingMenu = ({ open }) => {
  if (!open) return null;

  return (
    <div className="floating-menu">
      <div className="menu-group">
        <div className="menu-item"><FaSearch className="menu-icon" /><span>알바</span></div>
        <div className="menu-item"><FaBuilding className="menu-icon" /><span>부동산</span></div>
        <div className="menu-item"><FaCar className="menu-icon" /><span>중고차</span></div>
        <div className="menu-item"><FaStore className="menu-icon" /><span>비즈프로필 소식</span></div>
      </div>
      <div className="menu-group">
        <div className="menu-item"><FaBoxOpen className="menu-icon" /><span>여러 물건 팔기</span></div>
        <div className="menu-item"><FaShoppingBag className="menu-icon" /><span>내 물건 팔기</span></div>
      </div>
    </div>
  );
};

export default FloatingMenu;
