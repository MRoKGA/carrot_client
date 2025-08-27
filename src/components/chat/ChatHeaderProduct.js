import React from 'react';
import { FiCreditCard } from 'react-icons/fi';
import '../../css/chatHeaderProduct.css';

export default function ChatHeaderProduct({ product }) {
  if (!product) return null;

  const thumb = product.images?.[0];
  const src = (() => {
    try {
      return require(`../../assets/images/${thumb}`);
    } catch {
      return thumb?.startsWith('http') ? thumb : require(`../../assets/images/${thumb}`);
    }
  })();

  return (
    <div className="chp-wrap">
      <img className="chp-thumb" src={src} alt={product.title} />
      <div className="chp-body">
        <div className="chp-title">{product.title}</div>
        <div className="chp-price">
          {Number(product.price || 0).toLocaleString()}원
          {product.noOffer && <span className="chp-badge">가격제안불가</span>}
        </div>
        <div className="chp-actions">
          <button className="chp-btn"><FiCreditCard /> 당근페이</button>
          <button className="chp-btn chp-outline">약속잡기</button>
          <button className="chp-btn chp-outline">물품추가</button>
        </div>
      </div>
    </div>
  );
}
