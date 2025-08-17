// src/components/product/SellerProfile.jsx
import React from 'react';
import { FaFire } from 'react-icons/fa';
import '../../css/sellerProfile.css';

export default function SellerProfile({ seller }) {
  if (!seller) return null;
  const { name, avatar, region, score } = seller;

  const avatarSrc = (() => {
    try {
      return require(`../../assets/images/${avatar}`);
    } catch {
      return avatar?.startsWith('http') ? avatar : require(`../../assets/images/avatar-default.jpg`);
    }
  })();

  return (
    <div className="sp-wrap">
      <img className="sp-avatar" src={avatarSrc} alt={name} />
      <div className="sp-info">
        <div className="sp-top">
          <div className="sp-name">{name}</div>
          <div className="sp-score"><FaFire style={{marginRight:4}}/>{score}</div>
        </div>
        <div className="sp-sub">{region}</div>
      </div>
      <button className="sp-btn">프로필 보기</button>
    </div>
  );
}
