import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/miniProductCard.css';

export default function MiniProductCard({ item }) {
  const nav = useNavigate();
  const thumb = item.images?.[0];

  const goDetail = () => nav(`/product/${item.id}`, { state: item });

  const src = (() => {
    try {
      return require(`../../assets/images/${thumb}`);
    } catch {
      return thumb?.startsWith('http') ? thumb : require(`../../assets/images/${thumb}`);
    }
  })();

  return (
    <div className="mini-card" onClick={goDetail}>
      <img className="mini-thumb" src={src} alt={item.title} />
      <div className="mini-title">{item.title}</div>
      <div className="mini-price">{Number(item.price || 0).toLocaleString()}원</div>
    </div>
  );
}
